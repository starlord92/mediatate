var nudge_start_time;
var nudge_end_time;
//var imgURL = chrome.extension.getURL("meditation_flow/morning.jpg");




 //function to show the continue button
 async function continueButton() {
 	let promise = new Promise(function(resolve) {
 		document.getElementById("continue_button_174162884722728293").style.display = 'block';
		resolve('block');
 	});
 	
 	let showButtonPromise = await promise;

	document.getElementById("continue_button_174162884722728293").addEventListener("click", function() {
		//check the url of the current browser and allow use access to the according site
		var last_distracting_site_accessed = '';
		chrome.storage.sync.get('stored_last_distracting_site_accessed', function(data) {
			//console.log(" stored medi duration is " + data.stored_medi_duration);
			last_distracting_site_accessed = data.stored_last_distracting_site_accessed;
			console.log("last_distracting_site_accessed is: " + last_distracting_site_accessed);
			window.location = last_distracting_site_accessed;
		});
		}
	);
 };

function displayNudge () {
	$(document).ready(function() {

	var time = 5000;
		var interval;
		function generateTime(timer_length) {
			time = time - 1000;     
		}

		//update the count down for the breathing animation and ONLY AFTER THAT shows the 'return to work' and 'continue to ditracting site' option
		var x = function updateTimer() {     
			generateTime(time);
			if (time < 0) {         
				clearInterval(interval);
				continueButton();
			}	
		};
		function startTimer() {
			interval = setInterval(x, 1000);
		}
		startTimer();
	});
};

 displayNudge();