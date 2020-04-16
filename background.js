// 'use strict';

var work_start_time_hr, work_start_time_min, work_start_time_sec;
var work_end_time_hr, work_end_time_min, work_end_time_sec;
var medi_duration, medi_frequency, active_medi_date;
var installed_time_stamp;
var scheduled_meditation_checkbox;



chrome.runtime.onInstalled.addListener(function() {
	//console.log("background.js: extension is installed");

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

    //console.log("incoming message is " + incoming.message);
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
	chrome.storage.sync.set({stored_nudge_checkbox:true}, function() {
	});
	chrome.storage.sync.set({stored_nudge_start_time: '10:00:00'}, function() {
	});
	chrome.storage.sync.set({stored_nudge_end_time: '10:00:00'}, function() {
	});
	
	//each distracting site has an override_nudge signal that is 'on' when user choose to continue
	chrome.storage.sync.set({stored_facebook_continue: false}, function() {
		});
	chrome.storage.sync.set({stored_nytimes_continue: false}, function() {
		});
	chrome.storage.sync.set({stored_reddit_continue: false}, function() {
		});

	chrome.storage.sync.set({stored_last_distracting_site_accessed: "" }, function() {});



	
	if (callback) {
		callback();
	}
};

// if (
// 		    		(work_start_hour < work_end_hour && 
// 		    		current_hour >= work_start_hour && 
// 		    		current_hour < work_end_hour) 

// 				    ||

// 				    (work_start_hour > ork_end_hour 
// 				    &&
// 				    ((current_hour >= nudge_start_hour && current_hour >= nudge_end_hour) || (current_hour <= nudge_start_hour && current_hour < nudge_end_hour))
// 				    )

// 				    ||

// 				    (nudge_start_hour == nudge_end_hour)
// 				)

// 		    		{
// 						enable_nudge = 1;
// 						//console.log('nudge is enabled because it is during the period nudge is set to be active');
						
// 		    		} 
// 		    	else {
// 		    		enable_nudge = 0;
// 		    		//console.log('nudge is disabled because it is NOT during the period nudge is set to be active');
// 		    	}

//check for updated user settings
//check it is time to open the meditation tab and do so 
function checkTime() {
	//console.log("checktime is running");
	//updateTimeSetting();

	curr_time = new Date();
	//console.log("current time is " + curr_time);
	current_hour = curr_time.getHours();

	
	//to test if exec work, set a specific curr_time and see if a new tab open:
	//curr_time = new Date('December 17, 1995 22:00:00');

	if (curr_time.getHours() >= work_start_time_hr && curr_time.getHours() < work_end_time_hr) {
		 	// console.log('the current time is between work_end_time and work_start_time');
			if(curr_time.getMinutes() == 0 && curr_time.getSeconds() ==0) {
				openMeditationTab();
		 		//console.log("open meditation tab");
			}
	}
	// if (curr_time.getHours() < work_start_time_hr || curr_time.getHours() > work_end_time_hr) {
	// 	console.log("the current time is NOT between work_end_time and work_start_time");
	// }
}


	chrome.tabs.create({'url':'meditation_flow/home.html'}, 
		function(tab) {
			console.log("tab.windowId is " + tab.windowId);
			//chrome.windows.getCurrent
			chrome.windows.update(tab.windowId,{'state':'fullscreen'});
		}
	);

		// chrome.windows.create({'url':'meditation_flow/home.html', 'focused' : true, 'state':'fullscreen', 'type': 'popup'},
		// function(w) {chrome.windows.update(w.id,{'state':'maximized'});}
		// );


//auxiliary function: open a new tab nudging user to meditate
//activetabs/current tabs only
function openMeditationTab() {
	//chrome.tabs.create defaults to the current window, which is different from the one in focus: https://developer.chrome.com/extensions/windows#current-window
	//chrome.tabs.create({'url':'meditation_flow/home.html'}, );

	//we have to create and then update the state for fullscreen.  creating alone doesn't work. poor design on chrome's part
	// chrome.windows.create({'url':'meditation_flow/home.html', 'focused' : true, 'state':'fullscreen', 'type': 'popup'},
	// 	function(w) {chrome.windows.update(w.id,{'state':'fullscreen'});}
	// 	);
	chrome.tabs.create({'url':'meditation_flow/home.html'}, 
		function(tab) {
			console.log("tab.windowId is " + tab.windowId);
			//chrome.windows.getCurrent
			chrome.windows.update(tab.windowId,{'state':'fullscreen'});
		}
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
	//console.log(" stored scheduled meditation checkbox status " + data.stored_scheduled_meditation_checkbox);
	scheduled_meditation_checkbox = data.stored_scheduled_meditation_checkbox;
});

});







//////////logic to determine if nudge is enabled, and so, whether it is active based on he period the user set nudge to be active////////

var enable_nudge = 1;  // 0 = disable nudge |   1 = enable nudge
var nudge_start_time;
var nudge_end_time;
// get stored nudge start and end time
function getStoredNudgePeriod (val) {

	return new Promise(function(resolve) {
		chrome.storage.sync.get(['stored_nudge_start_time'], function(data) {
		          //console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);
		          nudge_start_time = data.stored_nudge_start_time;
		});
		chrome.storage.sync.get(['stored_nudge_end_time'], function(data) {
		          //console.log('stored_nudge_end_time is ' + data.stored_nudge_end_time);
		          nudge_end_time = data.stored_nudge_end_time;
		});
		resolve(val);
	});
};

//getStoredNudgePeriod(1).then(function(val){console.log(" val is " + val)});

function checkNudgeOnCriteria (val) {
	return new Promise(function(resolve) {

		chrome.storage.sync.get(['stored_nudge_checkbox'], function(data){	  
		    if (data.stored_nudge_checkbox == false) {
		    	//console.log('nudge is disabled because the checkbox check status is ' + data.stored_nudge_checkbox);
		    	enable_nudge = 0;
		    }

		    else {

		    	// console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox);

		    	var arr1 = nudge_start_time.split(':');
				var nudge_start_hour = parseInt(arr1[0], 10); 
				var nudge_start_min = parseInt(arr1[1], 10);

				var arr2 = nudge_end_time.split(':');
				var nudge_end_hour = parseInt(arr2[0], 10);
				var nudge_end_min = parseInt(arr2[1], 10);

				var now = new Date(); // current time
			    var current_hour = now.getHours();
			    var current_min = now.getMinutes();
		    	

			    //three scenarios: 
			    //(a)time is set between 7 pm and 1 am the next morning (start time < end time) 
			    //(b) between 1 am and 5 am (start time > end time)
			    //(c) start time < end time
		    	if (
		    		(nudge_start_hour < nudge_end_hour && 
		    		current_hour >= nudge_start_hour && 
		    		current_hour < nudge_end_hour) 

				    ||

				    (nudge_start_hour > nudge_end_hour 
				    &&
				    ((current_hour >= nudge_start_hour && current_hour >= nudge_end_hour) || (current_hour <= nudge_start_hour && current_hour < nudge_end_hour))
				    )

				    ||

				    (nudge_start_hour == nudge_end_hour)
				)

		    		{
						enable_nudge = 1;
						//console.log('nudge is enabled because it is during the period nudge is set to be active');
						
		    		} 
		    	else {
		    		enable_nudge = 0;
		    		//console.log('nudge is disabled because it is NOT during the period nudge is set to be active');
		    	}
		    }
		});

		//console.log("val passed to checkNudgeOnCriteria is: " + val);
		//console.log("enable nudge value after checkNudgeOnCriteria() is " + enable_nudge);
		resolve(val);

	});

};



// create an object with list of distracting sites to display nudge 
let distracting_sites_list = ["facebook", "nytimes", "reddit"];
chrome.storage.sync.set({stored_distracting_sites_list: distracting_sites_list}, function() {
	});
//regular expression to ensure any url and links belonging to a distracting site 
const facebook = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}facebook\.com(.*)/) ;
const reddit = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}reddit\.com(.*)/) ;
const instagram = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}instagram\.com(.*)/) ;
const twitter = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}twitter\.com(.*)/) ;

const nytimes = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}nytimes\.com(.*)/) ;
const cnn = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}cnn\.com(.*)/);
const buzzfeed = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}buzzfeed\.com(.*)/);
const youtube = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}youtube\.com(.*)/);

const netflix = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}netflix\.com(.*)/);
const hulu = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hulu\.com(.*)/);
const disneyplus = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hulu\.com(.*)/);
const hbonow = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hbonow\.com(.*)/);
const hbogo = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hbogo\.com(.*)/);

const tinder = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}tinder\.com(.*)/);
const pinterest = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}pinterest\.com(.*)/);
const fandom = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}fandom\.com(.*)/);

var last_nudge_time = new Date('December 17, 1995 22:00:00');
console.log("last_nudge_time set at installation: " + last_nudge_time);


//console.log(nytimes_match.test('https://jesus.mobile.nytimes.com//world'));

//instagram, cnn, buzzfeed, tumblr, netflix, pinterest, hulu, tinder, imgur, vimeo, amazon, yahoo
//

let distracting_site_matches = [facebook, reddit, instagram, twitter, nytimes, cnn, buzzfeed, netflix, hulu, youtube, disneyplus, hbonow, hbogo, tinder, pinterest, fandom];

function distracting_site_flag (request) {
	var result = false;
	for (var i = 0; i < distracting_site_matches.length; i++) {
		if (distracting_site_matches[i].test(request) == true) {
			console.log(i);
			result = true;
			console.log("match result is " + result);
			return (result);
		}
	}
	console.log("match result is " + result);
	return (result);
}

distracting_site_flag("https://mobile.fb.com///world");

///logic of nudge redirect
var nudge_redirect = chrome.extension.getURL('nudge_redirect.html');
var distracting_site = "https://www.nytimes.com/";
var tabIdToPreviousUrl = {};

//resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
async function resolveNudge(changeInfo_url, stored_previous_url, tabId, tab_dot_id) {

	let promise = await getStoredNudgePeriod(1).then(function(val) {checkNudgeOnCriteria(val);}).
                        then(function(val) {});

    //console.log("DISTRACTING SITE ? " + distracting_site_flag(changeInfo_url));
	
	//console.log("enable_nudge status after checkNudgeOnCriteria and before the logic  " +  enable_nudge);

	if (enable_nudge == 0) {
		console.log("nudge is not active or enabled. distracting sites can be accessed. ");
		return 0;
	}
	else {
		console.log("nudge is active! ");
		var previous_url;
		
		if (changeInfo_url != undefined) {
			 console.log(" changeInfo_url is: " + changeInfo_url);
	        //make sure the tab has the right id before getting its url 
	        if (tabId == tab_dot_id) {
	        	
	        	previousUrl = stored_previous_url;
	            //console.log("tabId == tab_dot_id");
	            console.log("stored_previous_url is " + stored_previous_url);
	        }
	        else {
	        	//console.log("tabId !== tab_dot_id");
	        	//console.log("tabID = " + tabId + " tab_dot_id " + tab_dot_id);
	        }
	        if (previousUrl != undefined && previousUrl === nudge_redirect &&  distracting_site_flag(changeInfo_url) == true
	        	) {
		          console.log("allows user to continue the site");
		          chrome.storage.sync.set({stored_last_distracting_site_accessed: changeInfo_url }, function() {});
		          chrome.tabs.update(tabId, { url: changeInfo_url });

	        }

	        else if (distracting_site_flag(changeInfo_url) == true){
	        	console.log ("last nudge time is: " + last_nudge_time) ;
	        	console.log ("current time is: " + Date.now()) ;
	        	if (Date.now() - last_nudge_time > 600000) {
	        		 chrome.tabs.update(tabId, { url: nudge_redirect });
	          		console.log("nudge redirects user to breathing practice where they can override it");
	          		last_nudge_time = Date.now();
	        	}

    	   		chrome.storage.sync.set({stored_last_distracting_site_accessed: changeInfo_url }, function() {});
	         
	        }
	        else {
	          ;
	        }
	        // Add the current url as previous url
	        tabIdToPreviousUrl[tabId] = changeInfo_url;
	        //console.log("adding url " + tabIdToPreviousUrl[tabId])
	       
	    }
	    else {
	    	//console.log(" changeInfo_url is " + changeInfo_url + ".  Ignore this tab update.");
	    }

	}
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.url != undefined) {
			console.log("changeInfo.url == " + changeInfo.url + " | tabIdToPreviousUrl[tabId] == " + tabIdToPreviousUrl[tabId] + "  | tabId ==  " + tabId + " tab.id ==     " +  tab.id);

			resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
		}
		else {;}
});















