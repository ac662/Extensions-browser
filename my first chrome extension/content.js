//message box to show the extension starting
alert("Hello from your new chrome extension!")

//adds a listener to communicate with the background.js file
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		
	  //logging the url and storing in firstHref
	  var firstHref = window.location.href;
      console.log(firstHref);
	  
	  //sending a message with the url to background.js 
	  chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);


/* We can use the chrome.tabs API to open a new tab: chrome.tabs.create({"url": "http://google.com"});

But chrome.tabs can only be used by background.js, so we’ll have to add some more message passing since background.js can open the tab, but can’t grab the URL. Here’s the idea:

1. Listen for a click on the browser action in background.js. When it’s clicked, send a clicked_browser_action event to content.js.

2. When content.js receives the event, it grabs the URL of the first link on the page. Then it sends open_new_tab back to background.js with the URL to open.

3. background.js listens for open_new_tab and opens a new tab with the given URL when it receives the message.

Clicking on the browser action will trigger background.js, which will send a message to content.js, which will send a URL back to background.js, which will open a new tab with the given URL.
*/
