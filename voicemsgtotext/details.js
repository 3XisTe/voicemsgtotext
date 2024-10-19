const startTaskBtn = document.getElementById('startTaskBtn');
const statusMessage = document.getElementById('statusMessage');
const statusText = document.getElementById('statusText');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');


chrome.storage.local.get(['selectedFile'], (result) => {

    statusMessage.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');

    statusMessage.classList.remove('hidden');
    statusText.innerText = 'Requesting resources...';

    const file = result.selectedFile;

    startTask(file.url);
    document.getElementById('back-button').addEventListener('click', () => {
      window.close();
    });

});

async function startTask(selectedAudio) {
    try {
       
        const response = await fetch('http://127.0.0.1:8000/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: selectedAudio })
        });

        if (!response.ok) {
            throw new Error('Failed to start transcribing');
        }

        const data = await response.json();
        const taskId = data.task_id;

       
        statusText.innerText = `Transcribing has started`;

       
        pollForTaskCompletion(taskId);

    } catch (error) {
       
        statusMessage.classList.add('hidden');
        errorSection.classList.remove('hidden');
        errorMessage.innerText = 'Error starting transcribing: ' + error.message;
    }
}

function pollForTaskCompletion(taskId) {
    statusMessage.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    const intervalId = setInterval(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/result/${taskId}`);

            if (!response.ok) {
                throw new Error('Error fetching transcribing status');
            }

            const data = await response.json();

            if (data.status === 'Completed') {
                clearInterval(intervalId);
                loadingSpinner.classList.add('hidden');
                resultSection.classList.remove('hidden');
                resultText.innerText = JSON.stringify(data.result, null, 2);
            } else if (data.status === 'Failure') {
                clearInterval(intervalId);
                loadingSpinner.classList.add('hidden');
                errorSection.classList.remove('hidden');
                errorMessage.innerText = 'Task failed: ' + data.error;
            } 
        } catch (error) {
            clearInterval(intervalId);
            loadingSpinner.classList.add('hidden');
            errorSection.classList.remove('hidden');
            errorMessage.innerText = 'Error during transcribing: ' + error.message;
        }
    }, 5000);
}
