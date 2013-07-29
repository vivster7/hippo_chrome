$(window).load(function() {
    console.log($('.no').filter(function() { return $(this).css('float') == 'right'; })[0]);
    setTimeout(initializeObserver, 5000);

    function initializeObserver() {
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) { 

            if ( $('.aDj').length && !$('.aDj:last').hasClass('hasSecureBar')) {
                $('.aDj:last').addClass('hasSecureBar');
                $('.aDj:last').append('<div><button type="button">Send Securely</button></div>');
                console.log('bar needs to be inserted');
            } else {
                console.log('nothing to do hereee');
            }
            console.log(document.getElementsByClassName('aDj').length); 
        }); 
    });

    target = document.getElementsByClassName("no")[2];
    observer.observe(target, {childList: true});
    }   
});




















































//@ seems to be in all gmail pages while loading..
var regex = /@/;
// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
	chrome.runtime.sendMessage({message: "show"}, function(response) {});
}

//Listen for messages and respond accordingly
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "grabText") {
      sendResponse(getSelectionHtml());
    }
    if (request.message == "replaceText") {
      displayImageInEmail(request.emailText);
    }
  });


//Grab the user-selected text and the sender's email
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return {html: html}
}

//displays the image in the email
function displayImageInEmail(imageHtml) {
  replaceSelectionWithHtml(imageHtml);
}

//Replaces selected text with html
function replaceSelectionWithHtml(html) {
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(), child;
        while ( (child = div.firstChild) ) {
            frag.appendChild(child);
        }
        range.insertNode(frag);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
    }
}

