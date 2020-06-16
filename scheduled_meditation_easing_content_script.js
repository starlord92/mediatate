// var iframe_reminder = document.createElement ("iframe");
// iframe_reminder.style.zIndex = "2147483647"; 
// iframe_reminder.style.display = "none";

// iframe_reminder.src  = chrome.extension.getURL ("/ease.html");
// document.body.appendChild(iframe_reminder);


var user_interacted_with_the_reminder = false;

//similuate the fadeout function in jquery
function fadeOutReminder() {
    var fadeTarget = document.getElementById("myModal472826662848262673");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } 
        else {
            clearInterval(fadeOutReminder);
        }
    }, 100);  
};

function stopVideo (callback) {

    var videos = [].slice.call(document.getElementsByTagName('video'), 0);
    console.log("number of videos: " + videos.length);
    for(i = 0;i < videos.length; i++)
    {
        videos[i].pause();
    }

    chrome.storage.sync.get(['stored_open_meditation_recording_page_flag'], function(data) {
        console.log('stored_open_meditation_recording_page_flag before the begin meditation button pressed is ' + data.stored_open_meditation_recording_page_flag);
    });

    callback();
};

function tell_background_script_to_open_meditation_recording_page () {
    stopVideo( function() {

        chrome.storage.sync.set({stored_open_meditation_recording_page_flag: true}, 
            function() {
                chrome.storage.sync.get(['stored_open_meditation_recording_page_flag'], function(data) {
                        console.log('stored_open_meditation_recording_page_flag is ' + data.stored_open_meditation_recording_page_flag);
                });
        });

        //fade out reminder and then hide it
        fadeOutReminder();
        document.getElementById('myModal472826662848262673').remove();
        document.getElementById('begin_meditation_button_66345654628423').remove();
        document.getElementById('skip_meditation_button_66345654628423').remove();
    });

    user_interacted_with_the_reminder = true;
};


var reminder_modal = document.createElement ("div");
reminder_modal.id = "myModal472826662848262673";


var begin_meditation_button = document.createElement ("div");
begin_meditation_button.id = "begin_meditation_button_66345654628423";
begin_meditation_button.innerHTML="begin meditation";

var skip_meditation_button = document.createElement ("div");
skip_meditation_button.id = "skip_meditation_button_66345654628423";
skip_meditation_button.innerHTML="skip";


reminder_modal.appendChild(begin_meditation_button);
reminder_modal.appendChild(skip_meditation_button);
document.body.appendChild(reminder_modal);



async function reminderAnimationSequence () {

    const show_reminder_and_begin_button = new Promise((resolve, reject) => {
        reminder_modal.style.display = "block";
        reminder_modal.style.animationPlayState = "running";
        console.log("show the reminder's animation and begin button");
        setTimeout(() => resolve("done!"), 30000);
    });
    let step1 = await show_reminder_and_begin_button;

    const show_skip_button = new Promise((resolve, reject) => {
        skip_meditation_button.style.display = "block"; 
        console.log("show skip meditation button");
        setTimeout(() => resolve("done!"), 1000);
    });
    let step2 = await show_skip_button;

    let fade_reminder = new Promise((resolve, reject) => {
        console.log("fade reminder");
        fadeOutReminder();
        //reminder_modal.style.animationPlayState = "paused";
        setTimeout(() => resolve("done!"), 2000);
    });
    let step3 = await fade_reminder;

    let hide_reminder = new Promise((resolve, reject) => {
        reminder_modal.display = "none";
        document.getElementById('myModal472826662848262673').remove();
        document.getElementById('begin_meditation_button_66345654628423').remove();
        document.getElementById('skip_meditation_button_66345654628423').remove();
        console.log("hide reminder");
    });
};

    reminderAnimationSequence();

    // user interaction: skip.  update the daily skipped meditation count   
    var skip_button = document.getElementById("skip_meditation_button_66345654628423");
    skip_button.addEventListener('click', fadeOutReminder); 

    var begin_meditation_button = document.getElementById("begin_meditation_button_66345654628423");
    begin_meditation_button.addEventListener('click', tell_background_script_to_open_meditation_recording_page); 




// window.onload = function() {

// var reminder_modal = document.createElement ("div");
// reminder_modal.id = "myModal472826662848262673";


// var begin_meditation_button = document.createElement ("div");
// begin_meditation_button.id = "begin_meditation_button_66345654628423";
// begin_meditation_button.innerHTML="begin meditation";

// var skip_meditation_button = document.createElement ("div");
// skip_meditation_button.id = "skip_meditation_button_66345654628423";
// skip_meditation_button.innerHTML="skip";


// reminder_modal.appendChild(begin_meditation_button);
// reminder_modal.appendChild(skip_meditation_button);
// document.body.appendChild(reminder_modal);




//     //takes care of user NON-interaction with the scheduled meditation reminder
//     chrome.runtime.onMessage.addListener(
//       function(incoming, sender, sendResponse) {

//         if (incoming.message == "dear scheduled_meditation_easing_content_script.js:  show scheduled mediation reminder to user") {
//             console.log("message to show scheduled mediation reminder to user is received");
//         }



//         if (incoming.message == "darken the screen" && user_interacted_with_the_reminder == false) {
//             console.log("message to darken the screen is received");
//         }


//         if (incoming.message == "darken the screen" && user_interacted_with_the_reminder == false) {
//             console.log("message to darken the screen is received");
//         }



//         if (incoming.message == "show breathing animation" && user_interacted_with_the_reminder == false) {
//         	console.log("message to show breathing animation is received");
//         	var modal = document.getElementById("myModal472826662848262673");
//     		modal.style.display = "block";
    		
//         	reminder_modal.style.animationPlayState = "running";
//         }

//         if (incoming.message == "skip meditation button shows up ; balloon animation stops on its own" && user_interacted_with_the_reminder == false) {
//         	console.log("message to show skip meditation button is received");
//        		var skip_button= document.getElementById("skip_meditation_button_66345654628423");
//     		skip_button.style.display = "block"; 
//         }

//         if (incoming.message == "fade out breathing animation" && user_interacted_with_the_reminder == false) {
//         	console.log("message to hide breathing animation is received");
//         	fadeOutReminder();
//         	reminder_modal.style.animationPlayState = "paused";
//         }

//         if (incoming.message == "hide breathing animation") {
//      		var modal = document.getElementById("myModal472826662848262673");
//      		modal.style.display = "none";
//             user_interacted_with_the_reminder = false;
//         }

//         return Promise.resolve("Dummy response to keep the console quiet");
//     });

//     // user interaction: skip.  update the daily skipped meditation count   
//     var skip_button = document.getElementById("skip_meditation_button_66345654628423");
//     skip_button.addEventListener('click', fadeOutReminder); 

//     var begin_meditation_button = document.getElementById("begin_meditation_button_66345654628423");
//     begin_meditation_button.addEventListener('click', tell_background_script_to_open_meditation_recording_page); 


// };















var nudge_start_time;
var nudge_end_time;


//used in v.1.0 to create modal ontop of the existing distracting page



// function displayNudge () {
// 	$(document).ready(function() {
// 		var time = 1000;
// 		var interval;

// 		function generateTime(timer_length) {
// 			time = time - 1000;     
// 			// var minutes = Math.floor((time % (1000 * 60 * 60))/(1000 * 60)); 
// 			// var seconds = Math.floor((time % (1000 * 60)) / 1000);
// 			// document.getElementById("timer_control535676465768").innerHTML = "0" + minutes + ":" + seconds ;
// 		}
// 		//update the count down every 1 second
// 		var x = function updateTimer() {     
// 			generateTime(time);
// 			if (time < 0) {         
// 				clearInterval(interval);
// 				// var bell_sound = document.getElementById("zenbellsound");
// 				// bell_sound.play();

// 				//bring user back to their work website
// 				var quit_site_button = document.getElementById("timer_control535676465768")
// 				quit_site_button.innerHTML = "return to work";
// 				quit_site_button.style.cursor= "pointer";
// 				quit_site_button.addEventListener("click", function() {
// 						window.location = "https://www.google.com";
// 					}
// 				);

// 			var modal = document.getElementById("myModal472826662848262673");
// 			var close_button_174162884722728293 = document.getElementById("close_button_174162884722728293");

// 			close_button_174162884722728293.addEventListener("click", function() {
// 					modal.style.display = "none";
// 				}
// 			);

// 			// $('#user_profile_icon_9809403065').on('click', function(event) {
				
// 			// 	$('#myModal472826662848262673').hide();
// 			// });

// 			//close the modal
// 			// close_button_174162884722728293.onclick = function() {
// 			//  modal.style.display = "none";
// 			// };
// 			//When the user clicks anywhere outside of the modal, close it
// 			window.onclick = function(event) {
// 			  if (event.target == modal) {
// 			    modal.style.display = "none";  
// 			  }
// 			};

// 			}	
// 		};
// 		function startTimer() {
// 			//var bell_sound = document.getElementById("zenbellsound");
// 			// bell_sound.play();
// 			// document.getElementById("timer_control").style.cursor= "initial";
// 			interval = setInterval(x, 1000);
// 		}
// 		startTimer();

// 		// 
// 		// Get the close element that closes the modal

// 		// function dummy () {

// 		// 	var modal = document.getElementById("myModal472826662848262673");
// 		// 	var close_button_174162884722728293 = document.getElementById("close_button_174162884722728293");

// 		// 	close_button_174162884722728293.addEventListener("click", function() {
// 		// 			modal.style.display = "none";
// 		// 		}
// 		// 	);

// 		// 	$('#user_profile_icon_9809403065').on('click', function(event) {
				
// 		// 		$('#myModal472826662848262673').hide();
// 		// 	});

// 		// 	//close the modal
// 		// 	close_button_174162884722728293.onclick = function() {
// 		// 	 modal.style.display = "none";
// 		// 	};
// 		// 	//When the user clicks anywhere outside of the modal, close it
// 		// 	window.onclick = function(event) {
// 		// 	  if (event.target == modal) {
// 		// 	    modal.style.display = "none";  
// 		// 	  }
// 		// 	};


// 		// };



// 		}); //ready
// };

 
// //////////logic to decide whether the modal should be displayed or not////////

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
// 		    	// console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox + ' so no nudge');
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
// 						injectHTML(0,function() {
// 							displayNudge();
// 						});
						
// 		    		} 
// 		    }
// 		});

// 		//console.log("val passed to checkNudgeOnCriteria is: " + val);

// 		resolve(val);

// 	});

// };

// getStoredNudgePeriod(1).then(function(val) {checkNudgeOnCriteria(val);}).
//                         then(function(val) {console.log(" value passed  to last then is " +  val)});


// getStoredNudgePeriod(0, function() {
// 	checkNudgeOnCriteria(0);
// });







