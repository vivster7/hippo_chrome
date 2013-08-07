//Display icon to signify the app is working.
$(window).load(function() {
    attachExtensionListeners();
    displayIcon();
    setInterval(findSendBarAndAttachSecureBar, 1000);
});

function findSendBarAndAttachSecureBar() {
    var sendButton = $('.T-I.J-J5-Ji.aoO.T-I-atl.L3');
    var sendBar = sendButton.parentsUntil('.aDj', '.aDh');
    $.each(sendBar, function(index, value) {
        var scope = $(this).parents().first();
        appendSecureBar(scope);
    });
}

//Listen for messages and respond accordingly
function attachExtensionListeners() {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message == "displayImage") {
          displayImage(request.emailText);
        }
        if (request.message == "sendEmail") {
          sendEmail(request.emailText);
        }
        if (request.message == "reloadObserver") {
            initializeCompositionObserver();
            attachToExisitingCompositions();
            initializeReplyObserver();
        }
    });
}

function displayIcon() {
    chrome.runtime.sendMessage({message: "show"}, function(response) {});
}

function appendSecureBar(scope) {
    var barWithSendButton = scope
    var barWithConvertButton = '<div class="aDh fake"><table><tbody><tr><td><div><button type="button" class="convert T-I J-J5-Ji aoO T-I-KE L3">Convert</button></div></td><td><div><button type="button" class="sendSecurely T-I J-J5-Ji aoO T-I-atl">Convert+Send</button></div></td></tr></tbody></table></div>'
    if (scope && !scope.hasClass('hasBarWithConvertButton')) {
        scope.addClass('hasBarWithConvertButton');
        barWithSendButton.append(barWithConvertButton);
        attachButtonListeners(scope);
        addBreakingSpace(scope);
    }
}

function attachButtonListeners(scope) {
    var scope                = scope.parentsUntil('.AD','.nH').last();
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

function addBreakingSpace(scope) {
    var commentTable = scope.parents('.aoP.HM');
    if (commentTable && !commentTable.hasClass('hasBreakingSpace')) {
        commentTable.addClass('hasBreakingSpace');
        var breakingSpace = '<div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>';
        commentTable.append(breakingSpace);
    }
}

function sendEmail(imageHTML) {
    displayImage(imageHTML);
    window.sendButton.click();
}

function displayImage(imageHtml) {
    window.inputArea.html(imageHtml);
    add_footer();
}

function add_footer() {
    var link_start = window.inputArea.html().indexOf("http")
    var link_end = window.inputArea.html().lastIndexOf(".jpg") + 4
    var link = window.inputArea.html().substring(link_start, link_end)
    
    var footer = "<br /><br />Having trouble viewing the image? <a href='"+link+"'>Click here</a>";
    window.inputArea.html(window.inputArea.html()+footer);
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
