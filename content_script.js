$(window).load(function() {
     chrome.runtime.sendMessage({message: "show"}, function(response) {});

    //This timeout lets gmail load before loading the content_script.
    setTimeout(initializeObserver, 1000);

    function initializeObserver() {
        var containerForAllCompositions = $('.no')[2];
        var containerForMostRecentComposition; //This is usually the scope for functions

        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) { 
                containerForMostRecentComposition = $('.AD:last'); 
                appendSecureBar(containerForMostRecentComposition);
            }); 
        });

        observer.observe(containerForAllCompositions, {childList: true});
    }   
});

function appendSecureBar(scope) {
    var barWithSendButton = scope.find('.aDj');
    var barWithConvertButton = '<div class="aDh"><table><tbody><tr><td><button type="button" class="convert T-I J-J5-Ji aoO T-I-KE L3">Convert</button></td><td><button type="button" class="sendSecurely T-I J-J5-Ji aoO T-I-atl">Convert+Send</button></td></tr></tbody></table></div>'
    if (scope && !scope.hasClass('hasBarWithConvertButton')) {
        scope.addClass('hasBarWithConvertButton');
        barWithSendButton.append(barWithConvertButton);
        attachButtonListeners(scope);
    }
}

function attachButtonListeners(scope) {
    var convertButton        = scope.find('.convert');
    var convertAndSendButton = scope.find('.sendSecurely');
    var minimizeButton       = scope.find('.Hl');
    window.sendButton        = scope.find('.T-I.J-J5-Ji.aoO.T-I-atl.L3');
    window.inputArea         = scope.find('.Am.Al.editable');

    convertButton.click(function() {
        chrome.runtime.sendMessage({message: "convert", html: window.inputArea.html()}, function(response){});
    });

    convertAndSendButton.click(function() {
        chrome.runtime.sendMessage({message: "convertAndSend", html: window.inputArea.html()}, function(response){});
        simulateGmailClick(minimizeButton)
    });
}


//Listen for messages and respond accordingly
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "displayImage") {
      displayImage(request.emailText);
    }
    if (request.message == "sendEmail") {
      sendEmail(request.emailText);
    }
  });

function sendEmail(imageHTML) {
    displayImage(imageHTML);
    window.sendButton.click();
}

function displayImage(imageHtml) {
    window.inputArea.html(imageHtml);
}

//This function is necessary to mimic a click for
//some gmail UI elements such as minimization.
function simulateGmailClick(jqueryElement) {
    var evt1 = document.createEvent("MouseEvents");
    var evt2 = document.createEvent("MouseEvents");
    evt1.initMouseEvent("mousedown", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
    evt2.initMouseEvent("mouseup", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);

    jqueryElement.each(function(d,element){
      element.dispatchEvent(evt1);
      element.dispatchEvent(evt2);
    });
}
