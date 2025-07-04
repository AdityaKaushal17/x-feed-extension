// Unique identifier for our extension elements
const EXTENSION_ID = 'x-feed-extension';

// Main initialization
function initializeExtension() {
  addCustomButton();
  applySavedDarkMode();
}

// Custom Button Implementation
function addCustomButton() {
  // Avoid duplicate button
  if (document.getElementById(`${EXTENSION_ID}-button`)) return;

  const button = document.createElement('button');
  button.id = `${EXTENSION_ID}-button`;
  button.textContent = 'My Extension';

  // Styling
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '9999',
    padding: '10px 20px',
    borderRadius: '20px',
    background: '#1da1f2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  });

  // Click handler
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'customButtonClicked' });
    console.log('Extension button clicked');
  });

  document.body.appendChild(button);
}

// Dark Mode Toggle
function toggleDarkMode(enable) {
  document.documentElement.style.filter = enable
    ? "invert(1) hue-rotate(180deg)"
    : "none";
}

// Apply saved setting
function applySavedDarkMode() {
  chrome.storage.sync.get(['darkMode'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Storage error:', chrome.runtime.lastError);
      return;
    }
    toggleDarkMode(result.darkMode || false);
  });
}

// Listen for background messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode(request.enable);
    chrome.storage.sync.set({ darkMode: request.enable });
    sendResponse({ success: true });
  }
  return true; // Required for async sendResponse
});

// DOM ready and SPA watcher
function observeForChanges() {
  const observer = new MutationObserver(() => {
    if (!document.getElementById(`${EXTENSION_ID}-button`)) {
      addCustomButton();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// One-time setup on load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initializeExtension();
  observeForChanges();
} else {
  window.addEventListener('DOMContentLoaded', () => {
    initializeExtension();
    observeForChanges();
  });
}
