// checking that this file is running
console.log('settings.js running');


//take user input and store it using sotrage.sync (When using storage.sync, the stored data will automatically be synced to any Chrome browser that the user is logged into, provided the user has sync enabled.) 


//upon submission, save the input to chrome.storage.sync
let user_setting_submit = document.getElementById('submit');


user_setting_submit.onclick = function(element) {

	//store user inout in the following three vars
	// guide: https://tinyurl.com/uyo2soh
	var work_start_time = document.getElementById('work_start_time').value;
	var work_end_time = document.getElementById('work_end_time').value;
	var medi_duration = document.getElementById('medi_duration').value;

	//store the input inside chrome.storage.sync 
	chrome.storage.sync.set({stored_work_start_time: work_start_time}, function() {
		console.log('work start time is ' + work_start_time);
	});;

	chrome.storage.sync.set({stored_work_end_time: work_end_time}, function() {
		console.log('work end time is ' + work_end_time);
	});;

	chrome.storage.sync.set({stored_medi_duration: medi_duration}, function() {
		console.log('the duration of each mediation period is ' + medi_duration);
	});;

	//proof that user input is sucessful stored in chrome.storage.sync
	chrome.storage.sync.get('stored_work_end_time', function(data) {
   		console.log(" stored work end time is " + data.stored_work_end_time);
  });

  
};