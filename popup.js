//Listens for clicks and begins the 
document.addEventListener('DOMContentLoaded', function () {
	button = document.getElementById('hippoButton');
  button.addEventListener('click', function() { 
		callSendSelectedText();
  });
});

//Initiates the calls to sendSelectedText in background.js
function callSendSelectedText() {
	var backgroundWindow = chrome.extension.getBackgroundPage();
	backgroundWindow.sendSelectedText();
}
