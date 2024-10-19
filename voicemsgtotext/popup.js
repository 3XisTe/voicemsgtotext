chrome.storage.local.get(['audioclipFiles'], (result) => {
    const fileList = document.getElementById('file-list');
    const files = result.audioclipFiles || [];
  
    if (files.length === 0) {
      fileList.innerHTML = "<li class='list-group-item'>No voice messages found</li>";
    } else {
      files.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const text = document.createElement('span');
        text.textContent = `${index + 1}. ${file.name}`;

        const iconMusic = document.createElement('span');
        iconMusic.className = 'icon is-small mr-2';
        iconMusic.innerHTML = '<i class="fas fa-music"></i>';

        const iconArrow = document.createElement('span');
        iconArrow.className = 'icon is-small mr-2';
        iconArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';

        const iconDocument = document.createElement('span');
        iconDocument.className = 'icon is-small mr-2';
        iconDocument.innerHTML = '<i class="fas fa-file-alt"></i>';

        listItem.appendChild(text);
        listItem.appendChild(iconMusic);
        listItem.appendChild(iconArrow);
        listItem.appendChild(iconDocument);

        listItem.addEventListener('click', () => {
          chrome.storage.local.set({ selectedFile: file });
          chrome.windows.create({
            url: 'details.html',
            type: 'popup',
            width: 600,
            height: 400
          });
        });

        fileList.appendChild(listItem);
      });
    }
  });
