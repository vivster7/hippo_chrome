//Sends background.js a message to tell content script to try
//and reload the observer
var backgroundWindow = chrome.extension.getBackgroundPage();
backgroundWindow.callReloadObserver();
