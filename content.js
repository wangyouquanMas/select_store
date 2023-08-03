document.addEventListener('mouseup', function() {
    // Get the selected text
    var selectedText = window.getSelection().toString().trim();
    console.log('Selected text:', selectedText);
    
    if (selectedText){
    let message = selectedText;
    chrome.runtime.sendMessage("ojiljljdfccjamehladmhhkooahmlkol",{type:"selectedText",text:message},response => {
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
    
   chrome.runtime.sendMessage("ojiljljdfccjamehladmhhkooahmlkol",{type:"selectedText",text:msg},response => {
      //    // Close the options page
      // close();
      if (!chrome.runtime.lastError || !retry) {
        clearTimeout(timer);
        callback(response);
      }
    });
  }
  