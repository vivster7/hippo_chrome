// Called when the user clicks on the browser action.

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "show")
  		chrome.pageAction.show(sender.tab.id);
      sendResponse({});
  });

function sendTextSelectMessage() {
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {message: "grabText"}, function(response) {
	  	alert(response);
	  	sendToService();
	  	alert("somethingHappened")
	  });
	});
}

function sendToService() {
	var params = "email[text]=Thisisatest"
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://privacy.omadahealth.com:3000/emails', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			alert(xhr.responseText);
		}
	}
	xhr.send(params);
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