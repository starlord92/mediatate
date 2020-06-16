//check if nudge option is on
//check if it's a time nudge should be on
//sort through the stored array that contains distracting websites
//if the current url obtained from wberequest is a match, then run the modal


var nudge_start_time;
var nudge_end_time;
//var imgURL = chrome.extension.getURL("meditation_flow/morning.jpg");

function injectHTML(val, callback) {

	// $(document).ready(function() {
		$.get(chrome.extension.getURL('/nudge.html'), function(data) {
	    $(data).appendTo('body');
	    console.log("nudge.html injected");
		});
	// });

	if (callback) {
		callback();
	}
	

};

//display the nudge modal window where user can interact and choose to navigate away from distracting sites

function displayNudge () {
	$(document).ready(function() {
		var time = 1000;
		var interval;

		function generateTime(timer_length) {
			time = time - 1000;     
			// var minutes = Math.floor((time % (1000 * 60 * 60))/(1000 * 60)); 
			// var seconds = Math.floor((time % (1000 * 60)) / 1000);
			// document.getElementById("timer_control535676465768").innerHTML = "0" + minutes + ":" + seconds ;
		}
		//update the count down every 1 second
		var x = function updateTimer() {     
			generateTime(time);
			if (time < 0) {         
				clearInterval(interval);
				// var bell_sound = document.getElementById("zenbellsound");
				// bell_sound.play();

				//bring user back to their work website
				var quit_site_button = document.getElementById("timer_control535676465768")
				quit_site_button.innerHTML = "return to work";
				quit_site_button.style.cursor= "pointer";
				quit_site_button.addEventListener("click", function() {
						window.location = "https://www.google.com";
					}
				);

			var modal = document.getElementById("myModal472826662848262673");
			var close_button_174162884722728293 = document.getElementById("close_button_174162884722728293");

			close_button_174162884722728293.addEventListener("click", function() {
					modal.style.display = "none";
				}
			);

			// $('#user_profile_icon_9809403065').on('click', function(event) {
				
			// 	$('#myModal472826662848262673').hide();
			// });

			//close the modal
			// close_button_174162884722728293.onclick = function() {
			//  modal.style.display = "none";
			// };
			//When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			  if (event.target == modal) {
			    modal.style.display = "none";  
			  }
			};

			}	
		};
		function startTimer() {
			//var bell_sound = document.getElementById("zenbellsound");
			// bell_sound.play();
			// document.getElementById("timer_control").style.cursor= "initial";
			interval = setInterval(x, 1000);
		}
		startTimer();

		// 
		// Get the close element that closes the modal

		// function dummy () {

		// 	var modal = document.getElementById("myModal472826662848262673");
		// 	var close_button_174162884722728293 = document.getElementById("close_button_174162884722728293");

		// 	close_button_174162884722728293.addEventListener("click", function() {
		// 			modal.style.display = "none";
		// 		}
		// 	);

		// 	$('#user_profile_icon_9809403065').on('click', function(event) {
				
		// 		$('#myModal472826662848262673').hide();
		// 	});

		// 	//close the modal
		// 	close_button_174162884722728293.onclick = function() {
		// 	 modal.style.display = "none";
		// 	};
		// 	//When the user clicks anywhere outside of the modal, close it
		// 	window.onclick = function(event) {
		// 	  if (event.target == modal) {
		// 	    modal.style.display = "none";  
		// 	  }
		// 	};


		// };



		}); //ready
};

 
//////////logic to decide whether the modal should be displayed or not////////

// get stored nudge start and end time
function getStoredNudgePeriod (val) {

	return new Promise(function(resolve) {
		chrome.storage.sync.get(['stored_nudge_start_time'], function(data) {
		          console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);
		          nudge_start_time = data.stored_nudge_start_time;
		});
		chrome.storage.sync.get(['stored_nudge_end_time'], function(data) {
		          console.log('stored_nudge_end_time is ' + data.stored_nudge_end_time);
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
		    	// console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox + ' so no nudge');
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
						injectHTML(0,function() {
							displayNudge();
						});
						
		    		} 
		    }
		});

		//console.log("val passed to checkNudgeOnCriteria is: " + val);

		resolve(val);

	});

};

getStoredNudgePeriod(1).then(function(val) {checkNudgeOnCriteria(val);}).
                        then(function(val) {console.log(" value passed  to last then is " +  val)});


// getStoredNudgePeriod(0, function() {
// 	checkNudgeOnCriteria(0);
// });







