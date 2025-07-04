document.getElementById('refreshButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('change', (e) => {
    chrome.storage.sync.set({ darkMode: e.target.checked });
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "TOGGLE_DARK_MODE",
        value: e.target.checked
      });
    });
  });
  
  // Load saved settings
  chrome.storage.sync.get(['darkMode'], (result) => {
    darkModeToggle.checked = result.darkMode || false;
  });