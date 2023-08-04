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
    if (request.type === "userThoughts") {
        // Get the user's thoughts and the selected text
        var thoughts = request.thoughts;
        var selectedText = request.text;
    
        // Use OpenAI to process the user's thoughts and the selected text
        // Replace "your-openai-api-key" with your actual OpenAI API key
        const headers = {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        };
    
        // Replace the URL and the body with the correct API endpoint and parameters for your use case
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({thoughts: thoughts, text: selectedText})
        }).then(response => response.json())
        .then(data => {
          console.log('Response from OpenAI:', data);
    
          // Send the result back to the content script
          sendResponse(data.result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    return true; 
});

