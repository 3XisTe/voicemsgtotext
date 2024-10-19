// background.js

const filesKey = 'audioclipFiles';

chrome.webRequest.onCompleted.addListener((details) => {
  const url = details.url;
  if (url.includes('.mp4') && url.includes('https://cdn.fbsbx.com/v/')) {
    const file = {
      url: url,
      name: "Voice message "
    };
    chrome.storage.local.get([filesKey], (result) => {
      const files = result[filesKey] || [];
      if (!files.includes(file)) {
        files.push(file);
        chrome.storage.local.set({ [filesKey]: files });
      }
    });
  }
}, { urls: ["<all_urls>"] });

function resetLocalStorage() {
  chrome.storage.local.remove(filesKey);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'resetStorage') {
    resetLocalStorage();
    sendResponse({ status: 'success' });
  }
});
