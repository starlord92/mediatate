console.log ("distracting_sites. js is up and running");


// details is a dictionarywith  info about the current URL request
var callback = function(details) {
	// redirect the active tab to intercept.html
	chrome.tabs.update({'url': 'intercept/intercept.html','active':true});
	console.log ("access to distracting site is redirected.");
	console.log("url of the current webRequest is " + details.url);	
	//return ({"redirectUrl": "https://mobile.facebook.com/"});
}; 
var filter = {urls: ["*://www.facebook.com/*"]};
var opt_extraInfoSpec = ['blocking'];


chrome.webRequest.onBeforeRequest.addListener(
 	callback, filter, opt_extraInfoSpec);

//awaits a possible message from intercept.js that user still wants to bypass and access the distracting page.  if this happens, use a BlockingResponse to request the disracting site 
	chrome.runtime.onMessage.addListener(
		function(message, sender, sendResponse) {
			 sendResponse({reply: "allora"});
			if (message.action == "continue to distracting site") {
				console.log ("receive the message to " + message.action);
				chrome.webRequest.onBeforeRequest.removeListener(callback);
				chrome.tabs.update({'url': 'https://www.fb.com/','active':true}); 
				setTimeout(function() {
					chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);	
				}, 10000);
					
			}
				

	 	}
	 );






//onbeforeRequest receives the request matching facebook.com

	// the outer callback updates the tab to intercept.html

	// 	the inner callback  add a Listener for messages from intercept.html and wait for override or compliance from user

	// the outer callback overide or comply





