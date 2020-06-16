// 'use strict';

var work_start_time_hr, work_start_time_min, work_start_time_sec;
var work_end_time_hr, work_end_time_min, work_end_time_sec;


var medi_duration; // only alows 1, 3, and 5
var medi_frequency; //only allows a number from 1 to 8

var hoursToMeditate = []; //an array storing all the hours during the next 24 hours when scheduled meditation should be offered to the user, the hours are 1 hour head of the actual meditation hour.  (for example, if i wanna meditate at 5, then the array has '4' instead of '5' as an array element.  this allows the alogirthm to ease the user into meditation before it actually occurs)

var active_medi_date;
var installed_time_stamp;
var scheduled_meditation_checkbox;


//===========UPON INSTALLATION===============================================//

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

  	//save the time user joins Theana
  	installed_time_stamp = Date.now();
  	//console.log("installed time and date is " + installed_time_stamp);
  	chrome.storage.sync.set({stored_installed_time_stamp: installed_time_stamp}, function() {

  			chrome.storage.sync.get(['stored_installed_time_stamp'], function(data) {
			        //console.log('stored_installed_time_stamp is ' + data.stored_installed_time_stamp);
			});
	});

	chrome.storage.sync.set({stored_skipped_meditation_count: 0}, function() {
  			chrome.storage.sync.get(['stored_skipped_meditation_count'], function(data) {
			        //console.log('stored_skipped_meditation_count is ' + data.stored_skipped_meditation_count);
			});
	});

  	//scheduled meditation is set to be on at installation
  	exec();

 //  	chrome.runtime.sendMessage({message: "turn off: nudge for nudge_content_script.js"}, function(r) {});
	// chrome.runtime.sendMessage({message: "turn on: nudge for nudge_content_script.js"}, function(r) {});
});


//===========================SCHEDULED MEDITATION BACKEND======================



//TURNING MEDITATION ON AND OFF----------------------------------------------
//this variable is how clearInterval will stop the checking for scherduled meditation
var scheduled_meditation_process = true;

function exec() {
 	// setDefaultTimeSetting(0, setUpScheduledMeditation);
 	setUpScheduledMeditation();
};

function setUpScheduledMeditation () {
		scheduled_meditation_process = setInterval(checkScheduledMeditationTime, 1000);
	};

//stop scheduled meditation if user uncheck the box for it
//also update local variable ork_start_time_hr, work_start_time_min, work_start_time_sec and what not, which are used to determine when and how often scheduled meditation should be run 
chrome.runtime.onMessage.addListener(
  function(incoming, sender, sendResponse) {
    //console.log("incoming message is " + incoming.message);
    if (incoming.message == "turn off scheduled meditation") {
    	clearInterval(scheduled_meditation_process);
    	console.log("scheduled meditation is TURNED OFF");
    }

    if (incoming.message == "turn on scheduled meditation") {
    	exec();
    	console.log("scheduled meditation is TURNED ON");
    }

    return Promise.resolve("Dummy response to keep the console quiet");
  });
//-----------------------------------------------------------------------------

//REMINDER MESSAGE FOR USER WHEN IT'S TIME TO MEDITATE-------------------------
var user_selects_begin_meditation = false;
var user_selects_skip_meditation = false;
var user_selects_nothing_for_scheduled_meditation = true;
var daily_skipped_meditation_count = 0;  // a 'day' last for 24 hours from the work_start_time_hour; 

var time = 57;

var second = 0;

var counter = 0;

async function checkScheduledMeditationTime() {
	//console.log("checktime is running");
	//updateTimeSetting();

	curr_time = new Date();
	//console.log("current time is " + curr_time);
	current_hour = curr_time.getHours();

	//tests scenario (b) - must change user settings start time to 8 pm, end time to 1 am, curr_time.getMinutes() == 0, and setInterval(checkScheduledMeditationTime2, 10000)
	// curr_time = new Date('May 26, 2020 23:00:00');
	// current_hour = curr_time.getHours();

	//tests scenario (c) must change user settings start time to 1 am, end time to 5 am, and curr_time.getMinutes() == 0, and setInterval(checkScheduledMeditationTime2, 10000)
	// curr_time = new Date('May 26, 2020 2:00:00');
	// current_hour = curr_time.getHours();

	// three scenarios:
	//    (a) 
	//    (b)time is set between 8 pm and 6 am the next morning (start time > end time, current time > both start anf end time) 
	//    (c) between 1 am and 5 am (start time > end time and current time < both start anf end time) 

	generateScheduledMeditationHours(medi_frequency, work_start_time_hr, work_end_time_hr);

	// correctMeditationFrequency(current_hour);
	//console.log("work_start_time_hr is " + work_start_time_hr);
	//console.log("work_end_time_hr is " + work_end_time_hr);
		if 
		(
			((work_start_time_hr < work_end_time_hr && 
			 current_hour >= work_start_time_hr && 
			 current_hour < work_end_time_hr) 
			&& correctMeditationFrequency(current_hour) == true)
			
			||
		 
			(((work_start_time_hr > work_end_time_hr 
			    &&
			    ((current_hour >= work_start_time_hr && current_hour >= work_end_time_hr) || (current_hour <= work_start_time_hr && current_hour < work_end_time_hr)))

			    ||

			    (work_start_time_hr == work_end_time_hr)
			) &&  correctMeditationFrequency(current_hour) == true)
		)
			{
				var found_defined_id = false;
				//console.log('it is a time scheduled meditation should be ACtive ');
			 	// 15 seconds before: an animated reminder (within which there is a 'begin meditation' button) shows up.  
			 	//add sound effects as a notification if the user has skipped x numbers of meditations
			 	if((curr_time.getMinutes() == time) 
			 		&& curr_time.getSeconds() == second){
			 		counter = counter + 1; 
			 	    //to play animation reminder every minute :
			 	    //time = (time + 1)%60; 

			 	    console.log('all conditions met ');
			 		//this async function is simply an attempt to send the message to play the remidner animation once and then chck if the id of the tab receicing the message is NOT undefined.  if it is undefined, we try again 
			 		let send_message_to_show_reminder = new Promise((resolve, reject) => {
			 				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				 				if (tabs[0] != undefined && tabs != undefined){
									console.log('defined tab id found is: ' + tabs[0].id);
						 			// chrome.tabs.sendMessage(tabs[0].id, {message: "dear scheduled_meditation_easing_content_script.js:  show scheduled mediation reminder to user"}, function(response) {
			 						// 		console.log("sending message to the play the reminder to the correct content script for the " + counter + " time");
						 			// 	});
						 			chrome.tabs.insertCSS(
						 				tabs[0].id, 
						 				{file:'/ease.css'},
						 				function () {
							 				chrome.tabs.executeScript(tabs[0].id, 
							 				{file:'/scheduled_meditation_easing_content_script.js'},
							 				function(done) {
				 								console.log("injecting content script and css to play the reminder to the correct content script for the " + counter + " time");
							 					}
							 				);
						 				}

						 			);

							        // chrome.storage.sync.set({stored_message_to_send_reminder_succeeds: true}, 
							        //     function() {
							        //         chrome.storage.sync.get(['stored_message_to_send_reminder_succeeds'], function(data) {
							        //                 console.log('stored_message_to_send_reminder_succeeds ? ' + data.stored_message_to_send_reminder_succeeds);
							        //         });
							        // });
								}
								else {
									//console.log("id of active tab is undefined!")
								}
			 				});		 			
			 			resolve("true");
			 		});

			 		let result = await send_message_to_show_reminder;

			 		

				}

				else {
					//console.log ("some conditions not met");
				}
			} 
		else {
			console.log('it is a time scheduled meditation should be INactive ');
		}
		return Promise.resolve(1);

};


// if the user clicks 'begin meditation', open the correct meditation recording, and set the open_meditation_recording_page_flag to false again
chrome.storage.onChanged.addListener(function () {

	chrome.storage.sync.get('stored_open_meditation_recording_page_flag', function(data) {
	
			// console.log(" stored_open_meditation_recording_page_flag is " + data.stored_open_meditation_recording_page_flag);
			if (data.stored_open_meditation_recording_page_flag == true) {
		    	chrome.tabs.create({'url':'meditation_flow/home.html'}, 
					function(tab) {
						// var id = tab.id;
						// console.log("tab.id of meditation recording player is " + tab.id);
				        chrome.storage.sync.set({stored_open_meditation_recording_page_flag: false},
				            function() {
				        });
					}
				);
			}
	});

});


//Helper function generate the hours wwhere meditation should take place according to the meditation frquency set by the user
function generateScheduledMeditationHours (medi_frequency, work_start_time_hr, work_end_time_hr) {

	//console.log("medi_frequency is a number? " + Number.isInteger(medi_frequency));
	while(hoursToMeditate.length > 0) {
    	hoursToMeditate.pop();
	}

	//    scenarios:
	//    (b)time is set between 8 pm and 6 am the next morning (start time > end time, current time > both start anf end time) 
	//    (c) between 1 am and 5 am (start time > end time and current time < both start anf end time) 
	if (work_start_time_hr >= work_end_time_hr) {
		var eligible_hour = work_start_time_hr;
		var done = false;
		var metZero = false;

		while (metZero == false) {

		// console.log ("done sttaus is " + done);
		// console.log ("eligible_hour is " + eligible_hour);
		// console.log ("metZero status is " + metZero);
		// console.log("work_end_time_hr is " + work_end_time_hr);

		hoursToMeditate.push(eligible_hour);
		eligible_hour = eligible_hour + medi_frequency;

		if (eligible_hour >= 24) {
			// console.log("eligible_hour >= 24");
			eligible_hour = eligible_hour-24;
			metZero = true;			
		}
		// console.log ("================================");
		}
		while (eligible_hour <= work_end_time_hr) {

			hoursToMeditate.push(eligible_hour);
			eligible_hour = eligible_hour + medi_frequency;
		}
	}

	else { //scenario (a): start time < end time 
		var eligible_hour = work_start_time_hr;
		while (eligible_hour <= work_end_time_hr) {
			hoursToMeditate.push(eligible_hour);
			eligible_hour = eligible_hour + medi_frequency;
		}
	}

	//console.log("start of array");
	for (var i = 0; i <= hoursToMeditate.length - 1; i++) {
		hoursToMeditate[i] = hoursToMeditate[i];
		//console.log(hoursToMeditate[i]);
	}
	//console.log("end of array");
};

//return true if the current_hour match with any number in the global array hoursToMeditate
function correctMeditationFrequency(current_hour) {
	for (var i = 0; i <= hoursToMeditate.length-1; i++) {
		if (i == hoursToMeditate.length) {console.log("match NOT found"); return false;}
		//console.log(hoursToMeditate[i]);
		
		if (hoursToMeditate[i] == current_hour) {
			//console.log("current hour is: " + current_hour);
			//console.log("match found: " + hoursToMeditate[i]);
			return true;
		}		
	}
	return false;
}


// AFTER user_profile_setting register a setting change from the user, it will send a signal to background.js so that the latter can update its local variables work_start_time_hr, work_start_time_min, work_start_time_sec using local storage
//This is ONLY for the purpose of providing uptodate data for the scheduled meditation algorithm

chrome.storage.onChanged.addListener(function () {

	chrome.storage.sync.get('stored_work_start_time', function(data) {
		work_start_time_hr=parseInt(data.stored_work_start_time, 10);
		

		//how to cparse html time input to three strings representing the hour, min, and second
		//var arr = data.stored_work_start_time.split(':');
		//work_start_time_hr = parseInt(arr[0], 10); 
		// work_start_time_min = parseInt(arr[1], 10);
		// work_start_time_sec = parseInt(arr[2], 10);
		//console.log(" updated work start hour is " + work_start_time_hr);
		// console.log(" updated work start min is " + work_start_time_min);
		// console.log(" updated work start sec is " + work_start_time_sec);
	});

	chrome.storage.sync.get('stored_work_end_time', function(data) {

		work_end_time_hr=parseInt(data.stored_work_end_time, 10);

		//console.log(" updated work end time is " + data.stored_work_end_time);
		// var arr = data.stored_work_end_time.split(':');
		// work_end_time_hr = parseInt(arr[0], 10); 
		// work_end_time_min = parseInt(arr[1], 10);
		// work_end_time_sec = parseInt(arr[2], 10);
		// console.log(" updated work end hour is " + work_end_time_hr);
		// console.log(" updated work end min is " + work_end_time_min);
		// console.log(" updated work end sec is " + work_end_time_sec);
	});

	chrome.storage.sync.get('stored_medi_duration', function(data) {
		//console.log(" stored medi duration is " + data.stored_medi_duration);
		medi_duration = parseInt(data.stored_medi_duration, 10);
	});

	chrome.storage.sync.get('stored_medi_frequency', function(data) {
		//console.log(" stored medi frequency is " + data.stored_medi_frequency);
		medi_frequency = parseInt(data.stored_medi_frequency, 10);
	});


	// chrome.storage.sync.get('stored_active_medi_date', function(data) {
	// 	active_medi_date = data.stored_active_medi_date;
	// });


	chrome.storage.sync.get('stored_scheduled_meditation_checkbox', function(data) {
		//console.log(" stored scheduled meditation checkbox status: " + data.stored_scheduled_meditation_checkbox);
		scheduled_meditation_checkbox = data.stored_scheduled_meditation_checkbox;
	});

});
//==================END OF SCHEDULED MEDITATION BACKEND================= //
































































// //////////logic to determine if nudge is enabled, and so, whether it is active based on he period the user set nudge to be active////////

// var enable_nudge = 1;  // 0 = disable nudge |   1 = enable nudge
// var nudge_start_time;
// var nudge_end_time;
// // get stored nudge start and end time
// function getStoredNudgePeriod (val) {

// 	return new Promise(function(resolve) {
// 		chrome.storage.sync.get(['stored_nudge_start_time'], function(data) {
// 		          console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);
// 		          nudge_start_time = data.stored_nudge_start_time;
// 		});
// 		chrome.storage.sync.get(['stored_nudge_end_time'], function(data) {
// 		          console.log('stored_nudge_end_time is ' + data.stored_nudge_end_time);
// 		          nudge_end_time = data.stored_nudge_end_time;
// 		});
// 		resolve(val);
// 	});
// };

// //getStoredNudgePeriod(1).then(function(val){console.log(" val is " + val)});

// function checkNudgeOnCriteria (val) {
// 	return new Promise(function(resolve) {

// 		chrome.storage.sync.get(['stored_nudge_checkbox'], function(data){	  
// 		    if (data.stored_nudge_checkbox == false) {
// 		    	//console.log('nudge is disabled because the checkbox check status is ' + data.stored_nudge_checkbox);
// 		    	enable_nudge = 0;
// 		    }

// 		    else {

// 		    	// console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox);

// 		    	var arr1 = nudge_start_time.split(':');
// 				var nudge_start_hour = parseInt(arr1[0], 10); 
// 				var nudge_start_min = parseInt(arr1[1], 10);

// 				var arr2 = nudge_end_time.split(':');
// 				var nudge_end_hour = parseInt(arr2[0], 10);
// 				var nudge_end_min = parseInt(arr2[1], 10);

// 				var now = new Date(); // current time
// 			    var current_hour = now.getHours();
// 			    var current_min = now.getMinutes();
		    	

// 			    //three scenarios: 
// 			    //(a)time is set between 7 pm and 1 am the next morning (start time < end time) 
// 			    //(b) between 1 am and 5 am (start time > end time)
// 			    //(c) start time < end time
// 		    	if (
// 		    		(nudge_start_hour < nudge_end_hour && 
// 		    		current_hour >= nudge_start_hour && 
// 		    		current_hour < nudge_end_hour) 

// 				    ||

// 				    (nudge_start_hour > nudge_end_hour 
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
// 		    }
// 		});

// 		//console.log("val passed to checkNudgeOnCriteria is: " + val);
// 		//console.log("enable nudge value after checkNudgeOnCriteria() is " + enable_nudge);
// 		resolve(val);

// 	});

// };



// // create an object with list of distracting sites to display nudge 
// let distracting_sites_list = ["facebook", "nytimes", "reddit"];
// chrome.storage.sync.set({stored_distracting_sites_list: distracting_sites_list}, function() {
// 	});
// //regular expression to ensure any url and links belonging to a distracting site 
// const facebook = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}facebook\.com(.*)/) ;
// const reddit = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}reddit\.com(.*)/) ;
// const instagram = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}instagram\.com(.*)/) ;
// const twitter = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}twitter\.com(.*)/) ;

// const nytimes = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}nytimes\.com(.*)/) ;
// const cnn = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}cnn\.com(.*)/);
// const buzzfeed = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}buzzfeed\.com(.*)/);
// const youtube = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}youtube\.com(.*)/);

// const netflix = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}netflix\.com(.*)/);
// const hulu = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hulu\.com(.*)/);
// const disneyplus = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hulu\.com(.*)/);
// const hbonow = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hbonow\.com(.*)/);
// const hbogo = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}hbogo\.com(.*)/);

// const tinder = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}tinder\.com(.*)/);
// const pinterest = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}pinterest\.com(.*)/);
// const fandom = new RegExp(/^https?:\/\/([a-zA-Z\d-]+\.){0,}fandom\.com(.*)/);

// var last_nudge_time = new Date('December 17, 1995 22:00:00');
// console.log("last_nudge_time set at installation: " + last_nudge_time);


// //console.log(nytimes_match.test('https://jesus.mobile.nytimes.com//world'));

// //instagram, cnn, buzzfeed, tumblr, netflix, pinterest, hulu, tinder, imgur, vimeo, amazon, yahoo
// //

// let distracting_site_matches = [facebook, reddit, instagram, twitter, nytimes, cnn, buzzfeed, netflix, hulu, youtube, disneyplus, hbonow, hbogo, tinder, pinterest, fandom];

// function distracting_site_flag (request) {
// 	var result = false;
// 	for (var i = 0; i < distracting_site_matches.length; i++) {
// 		if (distracting_site_matches[i].test(request) == true) {
// 			console.log(i);
// 			result = true;
// 			console.log("match result is " + result);
// 			return (result);
// 		}
// 	}
// 	console.log("match result is " + result);
// 	return (result);
// }

// distracting_site_flag("https://mobile.fb.com///world");

// ///logic of nudge redirect
// var nudge_redirect = chrome.extension.getURL('nudge_redirect.html');
// var distracting_site = "https://www.nytimes.com/";
// var tabIdToPreviousUrl = {};

// //resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
// async function resolveNudge(changeInfo_url, stored_previous_url, tabId, tab_dot_id) {

// 	let promise = await getStoredNudgePeriod(1).then(function(val) {checkNudgeOnCriteria(val);}).
//                         then(function(val) {});

//     //console.log("DISTRACTING SITE ? " + distracting_site_flag(changeInfo_url));
	
// 	//console.log("enable_nudge status after checkNudgeOnCriteria and before the logic  " +  enable_nudge);

// 	if (enable_nudge == 0) {
// 		console.log("nudge is not active or enabled. distracting sites can be accessed. ");
// 		return 0;
// 	}
// 	else {
// 		console.log("nudge is active! ");
// 		var previous_url;
		
// 		if (changeInfo_url != undefined) {
// 			 console.log(" changeInfo_url is: " + changeInfo_url);
// 	        //make sure the tab has the right id before getting its url 
// 	        if (tabId == tab_dot_id) {
	        	
// 	        	previousUrl = stored_previous_url;
// 	            //console.log("tabId == tab_dot_id");
// 	            console.log("stored_previous_url is " + stored_previous_url);
// 	        }
// 	        else {
// 	        	//console.log("tabId !== tab_dot_id");
// 	        	//console.log("tabID = " + tabId + " tab_dot_id " + tab_dot_id);
// 	        }
// 	        if (previousUrl != undefined && previousUrl === nudge_redirect &&  distracting_site_flag(changeInfo_url) == true
// 	        	) {
// 		          console.log("allows user to continue the site");
// 		          chrome.storage.sync.set({stored_last_distracting_site_accessed: changeInfo_url }, function() {});
// 		          chrome.tabs.update(tabId, { url: changeInfo_url });

// 	        }

// 	        else if (distracting_site_flag(changeInfo_url) == true){
// 	        	console.log ("last nudge time is: " + last_nudge_time) ;
// 	        	console.log ("current time is: " + Date.now()) ;
// 	        	if (Date.now() - last_nudge_time > 1) {
// 	        		 chrome.tabs.update(tabId, { url: nudge_redirect });
// 	          		console.log("nudge redirects user to breathing practice where they can override it");
// 	          		last_nudge_time = Date.now();
// 	        	}

//     	   		chrome.storage.sync.set({stored_last_distracting_site_accessed: changeInfo_url }, function() {});
	         
// 	        }
// 	        else {
// 	          ;
// 	        }
// 	        // Add the current url as previous url
// 	        tabIdToPreviousUrl[tabId] = changeInfo_url;
// 	        //console.log("adding url " + tabIdToPreviousUrl[tabId])
	       
// 	    }
// 	    else {
// 	    	//console.log(" changeInfo_url is " + changeInfo_url + ".  Ignore this tab update.");
// 	    }

// 	}
// };

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 		if (changeInfo.url != undefined) {
// 			console.log("changeInfo.url == " + changeInfo.url + " | tabIdToPreviousUrl[tabId] == " + tabIdToPreviousUrl[tabId] + "  | tabId ==  " + tabId + " tab.id ==     " +  tab.id);

// 			resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
// 		}
// 		else {;}
// });















