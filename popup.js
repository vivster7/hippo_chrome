document.addEventListener('DOMContentLoaded', function () {
	button = document.getElementById('hippoButton');
  button.addEventListener('click', function() { 
		callSendTextSelectMessage();
  	console.log('herqwerkjla;sdf'); });
});

function callSendTextSelectMessage() {
	var backgroundWindow = chrome.extension.getBackgroundPage();
	backgroundWindow.sendTextSelectMessage();
}
