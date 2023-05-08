chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url) {
    fetch(request.url)
      .then(response => response.json())
      .then(data => sendResponse(data))
      .catch(error => console.error(error));
    return true;  // need to return true to keep the sendResponse() function alive
  }
});
