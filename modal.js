// 'use strict';

chrome.runtime.onInstalled.addListener(function() {

	console.log("Installed");

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  //open a new tab where settings for user options (meditation duration, time of day meditation starts)

});


//is not effective because browser_action in manifes.json has a popup file
// chrome.browserAction.onClicked.addListener(function(tab) {
// 		chrome.tabs.create({'url':'settings.html'}, ); 
// 	});