console.log("Content script injected into Twitter");

// Example: Add a custom button to the Twitter UI
function addCustomButton() {
  const button = document.createElement('button');
  button.textContent = 'My Extension';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';
  button.addEventListener('click', () => {
    alert('Extension button clicked!');
  });
  document.body.appendChild(button);
}

// Wait for page to load
if (document.readyState === 'complete') {
  addCustomButton();
} else {
  window.addEventListener('load', addCustomButton);
}