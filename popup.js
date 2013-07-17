document.addEventListener('DOMContentLoaded', function () {
	button = document.getElementById('hippoButton');
  button.addEventListener('click', function() { 
		callSendTextSelectMessage();
  });
});

function callSendTextSelectMessage() {
	var backgroundWindow = chrome.extension.getBackgroundPage();
	backgroundWindow.sendTextSelectMessage();
}
