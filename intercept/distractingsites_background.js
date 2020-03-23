// details is a dictionarywith  info about the current URL request
var callback = function(details) {
	// redirect the active tab to intercept.html
	chrome.tabs.update({'url': 'intercept/intercept.html','active':true});

	//awaits for a possible message that user still wants to bypass and access the distracting page 
}; 
var filter =  {urls: ["*://www.facebook.com/*", "*://connect.facebook.net/*", "*://connect.facebook.net/*", "*://www.fb.com/*"]};
var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(
	callback, filter, opt_extraInfoSpec);