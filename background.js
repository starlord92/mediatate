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
			        console.log('stored_installed_time_stamp is ' + data.stored_installed_time_stamp);
			});
	});

  	exec();
 
});






//Order of execution: 
	//set default time settings
	//via setIntervals(), check every second to see if the current local time is (a) in between work start time and work end time interval and (b) if it is exactly x'clock.  if so, open a new meditation tab.

function exec() {
 	setDefaultTimeSetting(0, function() {
			setInterval(checkTime, 1000);
		
	});
};



//create default input for settings
//how to format html input of type time: https://www.w3schools.com/jsref/prop_input_time_value.asp
//TO BE REPLACE BY A ONE TIME PROMPTING NEW USER TO CHOOSE THEIR SETTING OPTIONS
function setDefaultTimeSetting(val, callback) {
	chrome.storage.sync.set({stored_work_start_time: '6:00:00'}, function() {
	});;
	chrome.storage.sync.set({stored_work_end_time: '23:00:00'}, function() {
	});;
	chrome.storage.sync.set({stored_medi_duration: '5'}, function() {
	});;
	chrome.storage.sync.set({stored_medi_frequency: '1'}, function() {
	});;
	chrome.storage.sync.set({stored_active_medi_date: 'Monday to Fri'}, function() {
	});;
	
	if (callback) {
		callback();
	}
};


//check for updated user settings
//check it is time to open the meditation tab and do so 
function checkTime() {

	//updateTimeSetting();



	curr_time = new Date();
	//console.log("current time is " + curr_time);
	
	//to test if exec work, set a specific curr_time and see if a new tab open:
	//curr_time = new Date('December 17, 1995 22:00:00');

	
	if (curr_time.getHours() >= work_start_time_hr && curr_time.getHours() <= work_end_time_hr) {
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



// auxiliary function: 
// update setting in case the user changes work start or end time or meditation duration.
//convert string user input for work start and end time stored in chrome.storage.sync to hour, minute, second in integer
	// function updateTimeSetting(val, callback) {

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

	// 	if (callback) {
	// 		callback();
	// 	}
	// };









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


