//@ seems to be in all gmail pages while loading..
var regex = /@/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
	chrome.runtime.sendMessage({message: "show"}, function(response) {});
} else {
  // No match was found.
}


// function getSelectionHtml() {
//     var html = "";
//     if (typeof window.getSelection != "undefined") {
//         var sel = window.getSelection();
//         if (sel.rangeCount) {
//             var container = document.createElement("div");
//             for (var i = 0, len = sel.rangeCount; i < len; ++i) {
//                 container.appendChild(sel.getRangeAt(i).cloneContents());
//             }
//             html = container.innerHTML;
//         }
//     } else if (typeof document.selection != "undefined") {
//         if (document.selection.type == "Text") {
//             html = document.selection.createRange().htmlText;
//         }
//     }
//     alert(html);
// }