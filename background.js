// Called when the user clicks on the browser action.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "show")
  		chrome.pageAction.show(sender.tab.id);
      sendResponse({});
  });

//Sends content_scripts the message to grabText
function sendSelectedText() {
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {message: "grabText"}, function(response) {
	  	sendToService(response);
	  });
	});
}

//Sends HippoService the selected text
function sendToService(response) {
	var senderEmail = response.email
	var html = response.html
	var params = "email[text]="+encodeURIComponent(html)+"&email[account]="+encodeURIComponent(senderEmail);
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://localhost:3000/emails', true);
	// xhr.open('POST','http://privacy.omadahealth.com:3000/emails', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (xhr.responseText == "http://localhost:3000/auth/gplus") {
				chrome.tabs.create({url:xhr.responseText});
			} else {
				callDisplayImageInEmail(xhr.responseText);
			}
		}
	}
	xhr.send(params);
}

//Initiates the displayInEmail method in content_script.js
function callDisplayImageInEmail(text) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {message: "replaceText", emailText: text}, function(response) {});
	});
}
