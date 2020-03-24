console.log ("distracting_sites. js is up and running");


chrome.webRequest.onBeforeRequest.addListener(
 	callback, filter, opt_extraInfoSpec);



var signal = 0;

// details is a dictionarywith  info about the current URL request
var callback = function(details, nested_callback) 
{

	// redirect the active tab to intercept.html
	chrome.tabs.update({'url': 'intercept/intercept.html','active':true});
	console.log ("access to distracting site is redirected.");
	console.log("url of the current webRequest is " + details.url);
	
	

	//awaits a possible message from intercept.js that user still wants to bypass and access the distracting page.  if this happens, use a BlockingResponse to request the disracting site 
	chrome.runtime.onMessage.addListener(
		function(message, sender, sendResponse) {
			 sendResponse({reply: "allora"});
			if (message.action == "continue to distracting site") {
				signal = 1;	
				console.log ("receive the message to " + message.action);
	 		}
	 	}
	 );


	

	if (signal == 1) {
		console.log ("override: signal is " + signal);
		
		return ({"redirectUrl": "https://mobile.facebook.com/"});
	}

	else {
		console.log ("compliance: signal is " + signal);
		return {cancel:true};
	}
	
	 
	
}; 

var filter = {urls: ["*://www.facebook.com/*"]};
var opt_extraInfoSpec = ['blocking'];



onbeforeRequest receives the request matching facebook.com

	// the outer callback updates the tab to intercept.html

	// 	the inner callback  add a Listener for messages from intercept.html and wait for override or compliance from user

	// the outer callback overide or comply





