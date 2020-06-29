//////////logic to determine if nudge is enabled, and so, whether it is active based on he period the user set nudge to be active////////

var enable_nudge = 1;  // 0 = disable nudge |   1 = enable nudge
var nudge_start_time;
var nudge_end_time;
var nudge_start_hour, nudge_end_hour;

// get stored nudge start and end time
function getStoredNudgePeriod (val) {

	//return new Promise(function(resolve) {
		console.log("getStoredNudgePeriod is running");
		chrome.storage.sync.get(['stored_nudge_start_time'], function(data) {
		          console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);
		          nudge_start_time = data.stored_nudge_start_time;
		});
		chrome.storage.sync.get(['stored_nudge_end_time'], function(data) {
		          console.log('stored_nudge_end_time is ' + data.stored_nudge_end_time);
		          nudge_end_time = data.stored_nudge_end_time;
		});
		//resolve(val);
	//});
};

//getStoredNudgePeriod(1).then(function(val){console.log(" val is " + val)});

//nudge ON/OFF status
function checkNudgeOnCriteria (val) {
	//return new Promise(function(resolve) {
		console.log("checkNudgeOnCriteria is running");
		chrome.storage.sync.get(['stored_nudge_checkbox'], function(data){	  
		    if (data.stored_nudge_checkbox == false) {
		    	console.log('nudge is disabled because the checkbox check status is ' + data.stored_nudge_checkbox);
		    	enable_nudge = 0;
		    }

		    else {

			    nudge_start_hour = nudge_start_time;
			    nudge_end_hour = nudge_end_time;
			    console.log("nudge_start_hour inside checkNudgeOnCriteria is " + nudge_start_time);
			    console.log("nudge_start_hour inside checkNudgeOnCriteria is " + nudge_end_time);
		    	

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
						console.log('nudge is enabled because it is during the period nudge is set to be active');			
		    		} 
		    	else {
		    		enable_nudge = 0;
		    		console.log('nudge is disabled because it is NOT during the period nudge is set to be active');
		    	}
		    }
		});

		//console.log("val passed to checkNudgeOnCriteria is: " + val);
		//console.log("enable nudge value after checkNudgeOnCriteria() is " + enable_nudge);
		//resolve(val);

	//});

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
//test if 'request' regex-match with the list of distracting sites
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
var previousUrl = 0;
var time_on_distracting_site_counter = 0;
var user_is_on_distracting_site = false;
const distracting_time_threshold = 300;

//resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
async function resolveNudge(changeInfo_url, stored_previous_url, tabId, tab_dot_id) {

	//find the time nudge should be active per user settings and whether nudge is set to on
	// let promise = await getStoredNudgePeriod(1).then(function(val) {checkNudgeOnCriteria(val);}).
 //                        then(function(val) {});

    //console.log("DISTRACTING SITE ? " + distracting_site_flag(changeInfo_url));
	
	//console.log("enable_nudge status after checkNudgeOnCriteria and before the logic  " +  enable_nudge);

	
	let op1 = new Promise((resolve, reject) => {
			getStoredNudgePeriod(1);
		   	setTimeout(() => resolve("done!"), 10);
	});
	let result1 = await op1;


	let op2 = new Promise((resolve, reject) => {
			checkNudgeOnCriteria(1);
		   	setTimeout(() => resolve("done!"), 10);
	});
	
	let result2 = await op2;

	

	let op3 = new Promise((resolve, reject) => {
		if (enable_nudge == 0) {
			console.log("nudge is not active or enabled. distracting sites can be accessed. ");
			return 0;
		}
		else {
			//console.log("nudge is active! ");
			//var previous_url;
			
			if (changeInfo_url != undefined) {
				 console.log(" changeInfo_url is: " + changeInfo_url);
		        //make sure the tab has the right id before getting its url 
		        if (tabId == tab_dot_id) {
		        	
		        	
		            console.log("previous_url is " + previousUrl);
		        }
		        else {
		        	//console.log("tabId !== tab_dot_id");
		        	//console.log("tabID = " + tabId + " tab_dot_id " + tab_dot_id);
		        }

		        //user is going from a non-distracting site to a site in the distracting list: 
		        //starts the counter if it's at 0
		        //otherwise continue the counter  
		        if (distracting_site_flag(changeInfo_url) == true &&distracting_site_flag(previousUrl) == false)
		        {
		        	//console.log ("last nudge time is: " + last_nudge_time) ;
		        	// console.log ("current time is: " + Date.now()) ;
		        	console.log ("user is going from a non-distracting site to a site in the distracting list") ;
		        	// if (Date.now() - last_nudge_time > 1) {
		        	// 	 chrome.tabs.update(tabId, { url: nudge_redirect });
		         //  		console.log("nudge redirects user to breathing practice where they can override it");
		         //  		last_nudge_time = Date.now();
		        	// }

		        	user_is_on_distracting_site = true;

	    	   		chrome.storage.sync.set({stored_last_distracting_site_accessed: changeInfo_url }, function() {});
		         
		        }
		        //user navigates from a distracting site to a non distracting site: stop the counter 
		        // else if ((previousUrl != undefined)  &&  (distracting_site_flag(previousUrl) == true && distracting_site_flag(changeInfo_url) == false) ||  )
		          else if ((previousUrl != undefined)  &&  (distracting_site_flag(previousUrl) == true && distracting_site_flag(changeInfo_url) == false))

		        {
		        	user_is_on_distracting_site = false;
		        	console.log ("user is going from a distracting site to a site in the NON-distracting list. status of user_is_on_distracting_site is " + user_is_on_distracting_site); 
		        }

		        else {
		          ;
		        }
		        // Add the current url as previous url
		        previousUrl = changeInfo_url;
		        console.log("updated previousUrl is  " + previousUrl);
		       
		    }
		    else {
		    	//console.log(" changeInfo_url is " + changeInfo_url + ".  Ignore this tab update.");
		    }

		}
		resolve("done!");


	});
	let result3 = await op3;



	return Promise.resolve(1);
};

//listen for when user switches tab: send the details of current tab to resolveNudge() 
chrome.tabs.onActivated.addListener(
	function callback(activeInfo) 
	{
		console.log("detection: user just switched from one tab to another");

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			if (tabs[0] != undefined && tabs != undefined){
			console.log('id of the tab user just switched to is: ' + tabs[0].id);
			console.log('url of the tab user just switched to is: ' + tabs[0].url);
			// console.log("tabs[0].url == " + tabs[0].url + " | previousUrl == " + previousUrl + "  | tabId ==  " + tabs[0].id + " tab.id ==     " +  tab.id);

			resolveNudge(tabs[0].url, previousUrl, tabs[0].id, tabs[0].id);

			}
			else {
				console.log("id of active tab is undefined!");
			}
		});	
	}
);

//listen for when user update a url of the current tab: send the details of current tab to resolveNudge()  
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.url != undefined) {
			console.log("changeInfo.url == " + changeInfo.url + " | tabIdToPreviousUrl[tabId] == " + previousUrl + "  | tabId ==  " + tabId + " tab.id ==     " +  tab.id);

			resolveNudge(changeInfo.url, previousUrl, tab.id, tab.id);
		}
		else {;}
});

//reset user_is_on_distracting_site to false, which is set by resolveNudge, each time Chrome starts so that we dont have injectNudgeContentScript running when nudge is set to off
chrome.runtime.onStartup.addListener(
	function callback() {
		user_is_on_distracting_site = false;
		console.log(" user_is_on_distracting_site is set to " + user_is_on_distracting_site);
	}

);


//when the counter reach x minute, inject the nudge content script
var runNudgeAlgoEverySec = setInterval(injectNudgeContentScript, 1000);
var meditation_session_in_progress_flag = 0;
async function injectNudgeContentScript() {


	if (user_is_on_distracting_site == true) {
		time_on_distracting_site_counter += 1;
		console.log("user has spent " + time_on_distracting_site_counter + " secs on distracting sites");
	}
	if (time_on_distracting_site_counter == distracting_time_threshold) {
		
		//inject the script only on distracting page and...
		let result = new Promise((resolve,reject)=> {
			var work_start_time_hr, work_end_time_hr, medi_frequency;
			var meditation_session_in_progress_flag;
			chrome.storage.sync.get('stored_medi_frequency', function(data) {medi_frequency = parseInt(data.stored_medi_frequency, 10);
			});
			chrome.storage.sync.get('stored_work_start_time', function(data) {
				work_start_time_hr=parseInt(data.stored_work_start_time, 10);
			});
			chrome.storage.sync.get('stored_work_end_time', function(data) {
				work_end_time_hr=parseInt(data.stored_work_end_time, 10);
			});
			chrome.storage.sync.get('stored_meditation_session_in_progress_flag', function(data) {
				meditation_session_in_progress_flag = data.stored_meditation_session_in_progress_flag;
				console.log("stored_meditation_session_in_progress_flag signal is  "+ data.stored_meditation_session_in_progress_flag);
			});
			resolve("done");
		});
		let wait = await result;

		let result1 = new Promise((resolve,reject)=> {
			generateScheduledMeditationHours(medi_frequency, work_start_time_hr, work_end_time_hr);
			resolve("done");
		});
		let wait1 = await result1;

		let result2 = new Promise((resolve,reject)=> {
		
			console.log ("correctMeditationFrequency(current_hour) is " + correctMeditationFrequency(new Date().getHours()));
			resolve("done");
		});
		let wait2 = await result2;

	

		//10 mins or more apart from a scheduled meditation sesssion and ...
		//and there is no meditation in progress
		if (((correctMeditationFrequency(new Date().getHours()) && new Date().getMinutes() >= 15 && new Date().getMinutes() <= 45) || (correctMeditationFrequency(new Date().getHours()) == false) ) && meditation_session_in_progress_flag == false)
		{
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				if (tabs[0] != undefined && tabs != undefined){
				console.log('defined tab id found is: ' + tabs[0].id);
		 			chrome.tabs.insertCSS(
		 				tabs[0].id, 
		 				{file:'/ease.css'},
		 				function () {
			 				chrome.tabs.executeScript(tabs[0].id, 
			 				{file:'/scheduled_meditation_easing_content_script.js'},
			 				function(done) {
									console.log("inject Nudge Content Script now.  reset counter");
			 					}
			 				);
		 				}
		 			);
				}
				else {
					console.log("id of active tab is undefined!")
				}
			});	

			time_on_distracting_site_counter = 0;
		}
	}

	return Promise.resolve(1);
};


//setInterval(injectNudgeContentScript, 1000);


//these functions are helpers from background js
// to be modularized

var hoursToMeditate = []; //an array storing all the hours during the next 24 hours when scheduled meditation should be offered to the user, the hours are 1 hour head of the actual meditation hour.  (for example, if i wanna meditate at 5, then the array has '4' instead of '5' as an array element.  this allows the alogirthm to ease the user into meditation before it actually occurs)
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

// //nudge ON/OFF status
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
// //test if 'request' regex-match with the list of distracting sites
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

// 	//find the time nudge should be active per user settings and whether nudge is set to on
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

// //listen for change in the tab id of the currently active tab and execute the algorithm in resolveNudge() to handle distracting site
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 		if (changeInfo.url != undefined) {
// 			console.log("changeInfo.url == " + changeInfo.url + " | tabIdToPreviousUrl[tabId] == " + tabIdToPreviousUrl[tabId] + "  | tabId ==  " + tabId + " tab.id ==     " +  tab.id);

// 			resolveNudge(changeInfo.url, tabIdToPreviousUrl[tabId], tabId, tab.id);
// 		}
// 		else {;}
// });