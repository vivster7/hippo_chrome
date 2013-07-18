//Listens for clicks and begins the 
document.addEventListener('DOMContentLoaded', function () {
	button = document.getElementById('hippoButton');
  button.addEventListener('click', function() { 
		callSendTextSelectMessage();
  });
});

//Initiates the calls to sendTextSelectMessage in background.js
function callSendTextSelectMessage() {
	var backgroundWindow = chrome.extension.getBackgroundPage();
	backgroundWindow.sendTextSelectMessage();
}
