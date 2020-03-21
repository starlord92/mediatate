// 'use strict';


//as extension is installed, allow user to edit settings (set by settings.js via the interafce settings.html) and save it: tbd


chrome.runtime.onInstalled.addListener(function() {
	console.log("Installed");

	// brings manifest's page_action default popup file into play
  	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        //no criteria, meaning any webpage will have the page action
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  	});

  	//what setInterval here does: check every second to see if the current local time is (a) in between work start time and work end time interval and (b) if it is exactly x'clock.  if so, open a new meditation tab
	// startMeditation(setInterval(checkTime, 1000));
	setDefaultTimeSetting(0, startMeditation(setInterval(checkTime, 1000)));

	//setDefaultTimeSetting: set default settings
	//startMeditation: parseTimeToInt();
	//checkTime

});


//create default input for settings
//how to format html input of type time: https://www.w3schools.com/jsref/prop_input_time_value.asp
function setDefaultTimeSetting(val, callback) {
	chrome.storage.sync.set({stored_work_start_time: '7:00:00'}, function() {	
	});;
	chrome.storage.sync.set({stored_work_end_time: '10:00:00'}, function() {
	});;
	chrome.storage.sync.set({stored_medi_duration: '5'}, function() {
	});;
	
	if (callback) {
		callback();
	}
};



var work_start_time_hr, work_start_time_min, work_start_time_sec;
var work_end_time_hr, work_end_time_min, work_end_time_sec;

function startMeditation(val, callback) {
	//outer function: exchange messages with settings.js to check for updated user input of work_start_time, work_end_time, meditation duration.  
	//Actually let's first try to read for update from chrome.storage.sync and convert them to integer:
	parseTimeToInt();

	//callback(): after the outer function is done, figure out the time when the meditation period applies 
	if (callback) {
		callback();
	}
	
}


//auxiliary function: open a new tab nudging user to meditate
function openMeditationTab() {
	chrome.tabs.create({'url':'timer_interface/timer.html'}, );
}


//auxiliary function: check if it is time to open the meditation tab
function checkTime() {
	curr_time = new Date();

	if (curr_time.getMinutes() == 0  && curr_time.getSeconds() == 0 && curr_time.getHours() >= work_start_time_hr && curr_time.getHours() <= work_end_time_hr) {
		 openMeditationTab();
	}
}

// auxiliary function: convert string user input for work start and end time stored in chrome.storage.sync to hour, minute, second in integer
	function parseTimeToInt() {

		chrome.storage.sync.get('stored_work_start_time', function(data) 
		{
		console.log(" stored work start time is " + data.stored_work_start_time);
		var arr = data.stored_work_start_time.split(':');
		work_start_time_hr = parseInt(arr[0], 10); 
		work_start_time_min = parseInt(arr[1], 10);
		work_start_time_sec = parseInt(arr[2], 10);
		console.log(" stored work start hour is " + work_start_time_hr);
		console.log(" stored work start min is " + work_start_time_min);
		console.log(" stored work start sec is " + work_start_time_sec);
		});

		chrome.storage.sync.get('stored_work_end_time', function(data) 
		{
		console.log(" stored work end time is " + data.stored_work_end_time);
		var arr = data.stored_work_end_time.split(':');
		work_end_time_hr = parseInt(arr[0], 10); 
		work_end_time_min = parseInt(arr[1], 10);
		work_end_time_sec = parseInt(arr[2], 10);
		console.log(" stored work end hour is " + work_end_time_hr);
		console.log(" stored work end min is " + work_end_time_min);
		console.log(" stored work end sec is " + work_end_time_sec);
		});
	};






//run this to make sure parseTimeToInt() converts html time input to 
// convert string user input stored in chrome.storage.sync correctly
// function parseTimeToInt() {
// 	var work_end_time_hr, work_end_time_min, work_end_time_sec;
// 	chrome.storage.sync.get('stored_work_end_time', function(data) {
// 		console.log(" stored work end time is " + data.stored_work_end_time);
// 		var arr = data.stored_work_end_time.split(':');
// 		work_end_time_hr = parseInt(arr[0], 10); 
// 		work_end_time_min = parseInt(arr[1], 10);
// 		work_end_time_sec = parseInt(arr[2], 10);
// 		console.log(" stored work end hour is " + work_end_time_hr);
// 		console.log(" stored work end min is " + work_end_time_min);
// 		console.log(" stored work end sec is " + work_end_time_sec);
// 	});
// };
//setDefaultTimeSetting(parseTimeToInt);


//is not effective because browser_action in manifes.json has a popup file
// chrome.browserAction.onClicked.addListener(function(tab) {
// 		chrome.tabs.create({'url':'settings.html'}, ); 
// 	});










var work_start_time_hr, work_start_time_min, work_start_time_sec;
var work_end_time_hr, work_end_time_min, work_end_time_sec;

function startMeditation(callback) {
	//outer function: exchange messages with settings.js to check for updated user input of work_start_time, work_end_time, meditation duration.  
	//Actually let's first try to read for update from chrome.storage.sync and convert them to integer:
	parseTimeToInt();

	//callback(): after the outer function is done, figure out the time when the meditation period applies 
	callback();
}


//auxiliary function: open a new tab nudging user to meditate
function openMeditationTab() {
	chrome.tabs.create({'url':'timer_interface/timer.html'}, );
}


//auxiliary function: check if it is time to open the meditation tab
function checkTime(){
	curr_time = new Date();

	if (curr_time.getMinutes() == 0  && curr_time.getSeconds() == 0 && curr_time.getHours() >= work_start_time_hr && curr_time.getHours() <= work_end_time_hr) {
		 openMeditationTab();
	}
}

// auxiliary function: convert string user input for work start and end time stored in chrome.storage.sync to hour, minute, second in integer
	function parseTimeToInt() {

		chrome.storage.sync.get('stored_work_start_time', function(data) 
		{
		console.log(" stored work start time is " + data.stored_work_start_time);
		var arr = data.stored_work_start_time.split(':');
		work_start_time_hr = parseInt(arr[0], 10); 
		work_start_time_min = parseInt(arr[1], 10);
		work_start_time_sec = parseInt(arr[2], 10);
		console.log(" stored work start hour is " + work_start_time_hr);
		console.log(" stored work start min is " + work_start_time_min);
		console.log(" stored work start sec is " + work_start_time_sec);
		});

		chrome.storage.sync.get('stored_work_end_time', function(data) 
		{
		console.log(" stored work end time is " + data.stored_work_end_time);
		var arr = data.stored_work_end_time.split(':');
		work_end_time_hr = parseInt(arr[0], 10); 
		work_end_time_min = parseInt(arr[1], 10);
		work_end_time_sec = parseInt(arr[2], 10);
		console.log(" stored work end hour is " + work_end_time_hr);
		console.log(" stored work end min is " + work_end_time_min);
		console.log(" stored work end sec is " + work_end_time_sec);
		});
	};



//what setInterval here does: check every second to see if the current local time is (a) in between work start time and work end time interval and (b) if it is exactly x'clock.  if so, open a new meditation tab
startMeditation(setInterval(checkTime, 1000));





// determine the timezone offset between the user and UTC (greenwich time): https://tinyurl.com/pevfhsq .  remmeber that creating a new date object in JS returns the user's browser's local time



