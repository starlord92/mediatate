// 'use strict';

chrome.runtime.onInstalled.addListener(function() {

	console.log("Installed");

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });

  //open a new tab where settings for user options (meditation duration, time of day meditation starts)

});


chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.create({'url':'timer_interface/home.html'}, ); 
	});