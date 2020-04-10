// 'use strict';

var work_start_time_hr, work_start_time_min, work_start_time_sec;
var work_end_time_hr, work_end_time_min, work_end_time_sec;
var medi_duration, medi_frequency, active_medi_date;
var installed_time_stamp;
var scheduled_meditation_checkbox;

chrome.runtime.onInstalled.addListener(function() {
	console.log("background.js: extension is installed");

	// brings manifest's page_action default popup file into play
	//so when user click on the icon, time settings appears
  	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        //no criteria, meaning any webpage will have the page action
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  	});

  	//save the time user joins theana
  	installed_time_stamp = Date.now();
  	//console.log("installed time and date is " + installed_time_stamp);
  	chrome.storage.sync.set({stored_installed_time_stamp: installed_time_stamp}, function() {

  			chrome.storage.sync.get(['stored_installed_time_stamp'], function(data) {
			        //console.log('stored_installed_time_stamp is ' + data.stored_installed_time_stamp);
			});
	});
  	//scheduled meditation is on at installation
  	exec();

 //  	chrome.runtime.sendMessage({message: "turn off: nudge for nudge_content_script.js"}, function(r) {});
	// chrome.runtime.sendMessage({message: "turn on: nudge for nudge_content_script.js"}, function(r) {});
});


//scheduled meditation
//Order of execution: 
	//set default time settings
	//via setIntervals(), check every second to see if the current local time is (a) in between work start time and work end time interval and (b) if it is exactly x'clock.  if so, open a new meditation tab.


var scheduled_meditation_process = true;

function exec() {
 	setDefaultTimeSetting(0, stopScheduledMeditation);
};

function stopScheduledMeditation () {
		scheduled_meditation_process = setInterval(checkTime, 1000);
	};

//stop scheduled meditation if user uncheck the box for it
chrome.runtime.onMessage.addListener(
  function(incoming, sender, sendResponse) {

    console.log("incoming message is " + incoming.message);
    if (incoming.message == "turn off") {
    	clearInterval(scheduled_meditation_process);
    }

    if (incoming.message == "turn on") {
    	exec();
    }
    return Promise.resolve("Dummy response to keep the console quiet");
      
  }); 
    





//create default input for settings
//how to format html input of type time: https://www.w3schools.com/jsref/prop_input_time_value.asp
//TO BE REPLACE BY A ONE TIME PROMPTING NEW USER TO CHOOSE THEIR SETTING OPTIONS
function setDefaultTimeSetting(val, callback) {
	//console.log("setDefaultTimeSetting is running");
	chrome.storage.sync.set({stored_work_start_time: '06:00:00'}, function() {
	});
	chrome.storage.sync.set({stored_work_end_time: '23:00:00'}, function() {
	});
	chrome.storage.sync.set({stored_medi_duration: '5'}, function() {
	});
	chrome.storage.sync.set({stored_medi_frequency: '1'}, function() {
	});
	chrome.storage.sync.set({stored_active_medi_date: 'Monday to Fri'}, function() {
	});
	chrome.storage.sync.set({stored_scheduled_meditation_checkbox: true}, function() {
	});

	//nudge 
	chrome.storage.sync.set({stored_nudge_checkbox: true}, function() {
	});
	chrome.storage.sync.set({stored_nudge_start_time: '10:00:00'}, function() {
	});
	chrome.storage.sync.set({stored_nudge_end_time: '23:00:00'}, function() {
	});

	
	if (callback) {
		callback();
	}
};


//check for updated user settings
//check it is time to open the meditation tab and do so 
function checkTime() {
	//console.log("checktime is running");
	//updateTimeSetting();

	curr_time = new Date();
	//console.log("current time is " + curr_time);
	
	//to test if exec work, set a specific curr_time and see if a new tab open:
	//curr_time = new Date('December 17, 1995 22:00:00');

	if (curr_time.getHours() >= work_start_time_hr && curr_time.getHours() < work_end_time_hr) {
		 	// console.log('the current time is between work_end_time and work_start_time');
			if(curr_time.getMinutes() ==0 && curr_time.getSeconds() ==0) {
				openMeditationTab();
		 		console.log("open meditation tab");
			}
	}
	// if (curr_time.getHours() < work_start_time_hr || curr_time.getHours() > work_end_time_hr) {
	// 	console.log("the current time is NOT between work_end_time and work_start_time");
	// }
}

//auxiliary function: open a new tab nudging user to meditate
//activetabs/current tabs only
function openMeditationTab() {
	//chrome.tabs.create defaults to the current window, which is different from the one in focus: https://developer.chrome.com/extensions/windows#current-window
	//chrome.tabs.create({'url':'meditation_flow/home.html'}, );

	//we have to create and then update the state for fullscreen.  creating alone doesn't work. poor design on chrome's part
	chrome.windows.create({'url':'meditation_flow/home.html', 'focused' : true, 'state':'fullscreen', 'type': 'popup'},
		function(w) {chrome.windows.update(w.id,{'state':'fullscreen'});}
		);
}


// actively listen for updated setting convert string user input for work start and end time stored in chrome.storage.sync to hour, minute, second in integer.  udpate will be written to chrome.storage by user_profile_settings.js

chrome.storage.onChanged.addListener(function () {

chrome.storage.sync.get('stored_work_start_time', function(data) {
	//console.log(" updated work start time is " + data.stored_work_start_time);
	var arr = data.stored_work_start_time.split(':');
	work_start_time_hr = parseInt(arr[0], 10); 
	work_start_time_min = parseInt(arr[1], 10);
	work_start_time_sec = parseInt(arr[2], 10);
	//console.log(" updated work start hour is " + work_start_time_hr);
	// console.log(" updated work start min is " + work_start_time_min);
	// console.log(" updated work start sec is " + work_start_time_sec);
});

chrome.storage.sync.get('stored_work_end_time', function(data) {
	//console.log(" updated work end time is " + data.stored_work_end_time);
	var arr = data.stored_work_end_time.split(':');
	work_end_time_hr = parseInt(arr[0], 10); 
	work_end_time_min = parseInt(arr[1], 10);
	work_end_time_sec = parseInt(arr[2], 10);
	//console.log(" updated work end hour is " + work_end_time_hr);
	// console.log(" updated work end min is " + work_end_time_min);
	// console.log(" updated work end sec is " + work_end_time_sec);
});

chrome.storage.sync.get('stored_medi_duration', function(data) {
	//console.log(" stored medi duration is " + data.stored_medi_duration);
	medi_duration = data.stored_medi_duration;
});

chrome.storage.sync.get('stored_medi_frequency', function(data) {
	//console.log(" stored medi frequency is " + data.stored_medi_frequency);
	medi_frequency = data.stored_medi_frequency;
});


chrome.storage.sync.get('stored_active_medi_date', function(data) {
	//console.log(" stored active medi dates are " + data.stored_active_medi_date);
	active_medi_date = data.stored_active_medi_date;
});


chrome.storage.sync.get('stored_scheduled_meditation_checkbox', function(data) {
	console.log(" stored scheduled meditation checkbox status " + data.stored_scheduled_meditation_checkbox);
	scheduled_meditation_checkbox = data.stored_scheduled_meditation_checkbox;
});

});


// chrome.webRequest.onBeforeRequest.addListener(
// 	function(details) { 
		
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     // console.log(tabs[0].url);
// });

// 	},
// 	{urls: []},
// );


//check that the webrequest is in the distracting site list: if tru
// check that the current url of the tab making the request is not nudge redirect.  if tru, redirect user to nudge_redirect
//


// var current_url;

// var nudge_redirect = "https://dev-do-not-share-bombay-legends.pashi.com/";
// var distracting_site = "https://www.nytimes.com/";



// function getCurrentURL(requested_url, callback) {
// 	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
// 	        current_url = tabs[0].url;        
// 	    });
// 	callback(requested_url);
// };


// var callback = function(request) {

// 	getCurrentURL(request.url, function (request_url) {
// 		if ( current_url.localeCompare(nudge_redirect) == 0 
// 	      	&& request_url.localeCompare(distracting_site) == 0) {
// 			console.log("current url: "+current_url+"  requests "+request.url);
// 			return {cancel: false};
//    		 }

// 	    else {
// 	    	return {redirectUrl: "https://www.reddit.com/"};
// 	    } 
// 	}

// 	); 


// };

// var filters = {
//     urls: []
// };

// var extraInfoSpec = ["blocking"];

// chrome.webRequest.onBeforeRequest.addListener(callback, filters, extraInfoSpec);



    //setTimeout(function(){ 

   //  	if ( current_url.localeCompare(nudge_redirect) == 0 
	  //     	&& request.url.localeCompare(distracting_site) == 0) {
			// console.log("current url: "+current_url+"  requests "+request.url);
			// return {cancel: false};
   // 		 }

	  //   else {
	  //   	return {redirectUrl: "https://www.reddit.com/"};
	  //   } 

    //},1);


// function tryMe (param1, param2) {
//     alert(param1 + " and " + param2);
// }

// function callbackTester (callback) {
//     callback (arguments[1], arguments[2]);
// }

// callbackTester (tryMe, "hello", "goodbye");














































