let message = '';  // Variable to store the last selected text

document.addEventListener('mouseup', function() {
    // Get the selected text
    var selectedText = window.getSelection().toString().trim();
    console.log('Selected text:', selectedText);
     // Remove any existing icon
     removeIcon();
    if (selectedText){
      console.log('Selected text:', selectedText);
    createIcon(event.pageX, event.pageY);
    message = selectedText;
    chrome.runtime.sendMessage("dfjincfllnakfgkmghmbodcmmhifcafa",{type:"selectedText",text:message},response => {
      //    // Close the options page
      // close();
      // if (!chrome.runtime.lastError || !retry) {
      //   clearTimeout(timer);
      //   callback(response);
      // }
    });
  }
    // send(message, handleResponse, handleError);
  });
  
  function handleResponse(response) {
    console.log(`Message from the background script: ${response}`);
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  function send(msg, callback, retry = 20) {
    const timer = setTimeout(() => send(msg, callback, retry - 1), 100);
    
   chrome.runtime.sendMessage("dfjincfllnakfgkmghmbodcmmhifcafa",{type:"selectedText",text:msg},response => {
      //    // Close the options page
      // close();
      if (!chrome.runtime.lastError || !retry) {
        clearTimeout(timer);
        callback(response);
      }
    });
  }
  
  
// Function to create the icon
function createIcon(x, y) {
    console.log('Creating icon at position:', x, y);
    // Create a new div element
    let icon = document.createElement('div');

        // Adjust x and y for scrolling
        x -= window.scrollX;
        y -= window.scrollY;
    
    // Set the position and other properties of the icon
    icon.style.position = 'fixed';
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.backgroundColor = 'blue'; // Or any color you want
    icon.style.borderRadius = '50%';
    icon.style.cursor = 'pointer';
    icon.id = 'myExtensionIcon';

    // Append the icon to the body
    document.body.appendChild(icon);

     // Log the actual position of the icon
     console.log('Actual position of the icon:', icon.getBoundingClientRect());
}

// Function to remove the icon
function removeIcon() {
    let icon = document.getElementById('myExtensionIcon');
    if (icon) {
        icon.remove();
    }
}


// Function to create the floating window
function createWindow(selectedText) {
  console.log('Creating window');
  // Create a new div element
  let window = document.createElement('div');

  // Set the position and other properties of the window
  window.style.position = 'fixed';
  window.style.left = '50%';
  window.style.top = '50%';
  window.style.width = '400px';
  window.style.height = '300px';
  window.style.backgroundColor = 'white';
  window.style.border = '1px solid black';
  window.style.borderRadius = '10px';
  window.style.padding = '10px';
  window.style.zIndex = '10000';
  window.style.overflow = 'auto';
  window.style.transform = 'translate(-50%, -50%)'; // Center the window
  window.id = 'myExtensionWindow';

  // Create the elements inside the window
  let text = document.createElement('p');
  text.textContent = 'Selected text: ' + message;
  let input = document.createElement('textarea');
  input.placeholder = 'Enter your thoughts here...';
  let submit = document.createElement('button');
  submit.textContent = 'Submit';

  // Append the elements to the window
  window.appendChild(text);
  window.appendChild(input);
  window.appendChild(submit);

  // Append the window to the body
  document.body.appendChild(window);
}

// Function to remove the window
function removeWindow() {
  console.log('Removing window');
  let window = document.getElementById('myExtensionWindow');
  if (window) {
      window.remove();
  }
}

// Listen for click events on the icon and create the floating window
document.addEventListener('mousedown', function(event) {
  console.log('Clicked:', event.target.id);

  if (event.target.id === 'myExtensionIcon') {
      console.log('Stored selected text:', message);

      // Remove any existing window
      removeWindow();

      // Create the floating window
      createWindow(message);
  }
});

// Listen for click events on the document
document.addEventListener('click', function(event) {
  // Check if the clicked target is the window or a descendant of the window
  let window = document.getElementById('myExtensionWindow');
  if (window && !window.contains(event.target)) {
    // The clicked target is not the window or a descendant of the window
    // So, remove the window
    removeWindow();
  }

  if (event.target.textContent === 'Submit') {
    // Get the user's thoughts from the textarea
    let thoughts = document.querySelector('#myExtensionWindow textarea').value;
    console.log('Thoughts:', thoughts);

     // Send the user's thoughts and the selected text to the background script
     chrome.runtime.sendMessage("dfjincfllnakfgkmghmbodcmmhifcafa",{type:"userThoughts",thoughts:thoughts,text:message},response => {
      console.log('Response:', response);

      // Display the result returned by OpenAI in the floating window
      let result = document.createElement('p');
      result.textContent = 'Result: ' + response;
      document.getElementById('myExtensionWindow').appendChild(result);
    });
  }


});



