// Called when the user clicks on the browser action.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "show") {
  		chrome.pageAction.show(sender.tab.id);
      sendResponse({});
    }
    if (request.message == "convert") {
			sendToService(request.html, false);
    	sendResponse({});
    }
    if (request.message == "convertAndSend") {
			sendToService(request.html, true);
    	sendResponse({});
    }
  });

//Sends HippoService the selected text
function sendToService(html, shouldEmail) {
	var params = "email[text]="+encodeURIComponent(html);
	var xhr = new XMLHttpRequest();
  // xhr.open('POST','http://hyppo.herokuapp.com/emails', true);
  xhr.open('POST','http://localhost:3000/emails', true);
	// xhr.open('POST','http://privacy.omadahealth.com:3000/emails', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			(shouldEmail) ? callSendEmail(xhr.responseText) : callDisplayImage(xhr.responseText); 
		}
	}
	xhr.send(params);
}

//Initiates the displayInEmail method in content_script.js
function callDisplayImage(text) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {message: "displayImage", emailText: text}, function(response) {});
	});
}

//Initiates the callSendEmail method in content_script.js
function callSendEmail(text) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {message: "sendEmail", emailText: text}, function(response) {});
  });
}

//Initiates the initializeCompositionObserver method in content_script.js
function callReloadObserver() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {message: "reloadObserver"}, function(response) {});
  });
}
