$(window).load(function() {
    //This timeout lets gmail load before loading the JS.
    setTimeout(initializeObserver, 1000);

    function initializeObserver() {
        //Naming DOM elements
        // containerForAllCompositions = getContainerForAllCompositions();
        // containerForMostRecentComposition = $('AD:last'); //This is scope

        secureBar = '<div class="aDh"><table><tbody><tr><td><button type="button" class="convert T-I J-J5-Ji aoO T-I-KE L3">Convert</button></td><td><button type="button" class="sendSecurely T-I J-J5-Ji aoO T-I-atl">Convert+Send</button></td></tr></tbody></table></div>'
        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) { 
                appendSecureBar(containerForMostRecentComposition);
                if ($('.aDj').length && !$('.aDj:last').hasClass('hasSecureBar')) {
                    $('.aDj:last').addClass('hasSecureBar');
                    $('.aDj:last').append(secureBar);
                    $('.convert:last').click(function() {
                        window.inputArea = $(this).parentsUntil( $(".iN") ).find( $(".Am.Al.editable") );
                        html = window.inputArea.html();
                        chrome.runtime.sendMessage({message: "convert", html: html}, function(response){});
                    });
                    $('.sendSecurely:last').click(function() {
                        window.inputArea = $(this).parentsUntil( $(".iN") ).find( $(".Am.Al.editable") );
                        html = window.inputArea.html();
                        chrome.runtime.sendMessage({message: "convert", html: html}, function(response){});
                        minimizeButton = window.inputArea.parentsUntil( $('.Hd') ).parent().find( $('.Hl') );
                        window.sendButton = window.inputArea.parentsUntil( $('.Hd') ).find( $('.T-I.J-J5-Ji.aoO.T-I-atl.L3') );
                        simulateGmailClick(minimizeButton);

                    });
                }
            }); 
        });

        observer.observe(containerForAllCompositions, {childList: true});
    }   
});

// function appendSecureBar(scope) {
//     //Naming DOM elements
//     barWithSendButton = scope.find('.aDj');
//     barWithConvertButton = '<div class="aDh"><table><tbody><tr><td><button type="button" class="convert T-I J-J5-Ji aoO T-I-KE L3">Convert</button></td><td><button type="button" class="sendSecurely T-I J-J5-Ji aoO T-I-atl">Convert+Send</button></td></tr></tbody></table></div>'
    
//     if (scope.length && !scope.hasClass('hasBarWithConvertButton')) {
//         scope.addClass('hasBarWithConvertButton');
//         barWithSendButton.append(barWithConvertButton);
//         attachButtonListeners(scope);
//     }
// }

// function getContainerForAllCompositions() {
//    $('.no').filter(function() {
//         return $(this).css('float') == 'right'
//     }); 
// }

// //@ seems to be in all gmail pages while loading..
// var regex = /@/;
// // Test the text of the body element against our regular expression.
// if (regex.test(document.body.innerText)) {
//   // The regular expression produced a match, so notify the background page.
// 	chrome.runtime.sendMessage({message: "show"}, function(response) {});
// }

//Listen for messages and respond accordingly
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // if (request.message == "grabText") {
    //   sendResponse(getSelectionHtml());
    // }
    if (request.message == "replaceText") {
      displayImageInEmail(request.emailText);
    }
  });


//displays the image in the email
function displayImageInEmail(imageHtml) {
    window.inputArea.html(imageHtml);
    window.sendButton.click();
}

function simulateGmailClick(jqueryElement) {
    // Trigger a click on Gmail UI button from Javascript
    // Gmail UI click is generated by MouseUp and MouseDown events
    var evt1 = document.createEvent("MouseEvents");
    var evt2 = document.createEvent("MouseEvents");
    evt1.initMouseEvent("mousedown", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
    evt2.initMouseEvent("mouseup", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);

    jqueryElement.each(function(d,element){
      element.dispatchEvent(evt1);
      element.dispatchEvent(evt2);
    });
}
