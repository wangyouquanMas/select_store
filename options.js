document.getElementById('optionsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let apiKey = document.getElementById('apiKey').value;
    let pageId = document.getElementById('pageId').value;

    chrome.storage.sync.set({apiKey: apiKey, pageId: pageId}, function() {
        console.log('Options saved.');
    });
});
