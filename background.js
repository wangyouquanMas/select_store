chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var selectedText = request.text;
    console.log(selectedText);

    if (request.type === "selectedText") {
        console.log('Received selected text:', selectedText);

        chrome.storage.sync.get(['apiKey', 'pageId'], function(result) {
            const api_key = result.apiKey;
            const parent_page_id = result.pageId;

            const headers = {
                "Authorization": "Bearer " + api_key,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            };

            const payload = {    
                "children": [
                    {
                        "object": "block",
                        "type": "paragraph",
                        "paragraph": {
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Text selected from the webpage: " + selectedText
                                    }
                                }
                            ]
                        }
                    }
                ]
            };

            fetch('https://api.notion.com/v1/blocks/' + parent_page_id + '/children', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(payload)
            }).then(response => response.json())
            .then(data => console.log('Response from Notion:', data))
            .catch((error) => {
              console.error('Error:', error);
            });
        });
    }
    return true; 
});
