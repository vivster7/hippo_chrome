// Called when the user clicks on the browser action.

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "show")
  		chrome.pageAction.show(sender.tab.id);
      sendResponse({});
  });

function sendTextSelectMessage() {
	alert('sentMessage');
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});
}


// // Called when a message is passed.  We assume that the content script
// // wants to show the page action.
// function onRequest(request, sender, sendResponse) {
//   // Show the page action for the tab that the sender (content script)
//   // was on.
//   chrome.pageAction.show(sender.tab.id);
//   // Return nothing to let the connection be cleaned up.
//   sendResponse({});
// };

// // Listen for the content script to send a message to the background page.
// chrome.extension.onRequest.addListener(onRequest);