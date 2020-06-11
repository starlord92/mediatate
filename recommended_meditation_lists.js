//LOGIC PART
// Broad topics may include: look, wealth, intelligence, vocal qualities.
// Each day a broad topic is selected. Based on this, a set of recordings will be presented through out the day.

// main recommended meditation recording will be changed by the time of the day:
// 6 am-9 am: waking up & warming up: introducing the topic
// 9 am - 12 pm: delving deeper into the topic
// 12 pm -2pm: lunch - general eating
// 2 pm - 5pm: delving into the topic even deeper
// 7 pm -8 pm: dinner - general eating
// 9-12 pm: 'journey not the reward' typed
// 11 pm -1 am: winding down

var being_liked_recording_title_innerhtml_list = [

"The Wake Up: Someone Like(s) You",
"The Warm Up: Theory of being Liked",
"Lunch Hours: Take a (Cafeteria) Seat",
"Dinner Time: Eating Alone",
"The Evening Chat: The Courage to be Disliked"

];

var being_liked_recording_file_html_id_list = ["runningsound", "zenbellsound", "bright_metal_tune_mallet", "andrew_scheduled_meditation_reminder"];

var curr_recommended_meditation_file = document.getElementById("bright_metal_tune_mallet");
//var curr_recommended_meditation_file = document.getElementById("andrew_scheduled_meditation_reminder");

$(document).ready(function() { 
	console.log("recommended_meditation_lists.js script is loaded");

	//changeRecommendedRecordings();


});

var  monitor_time = 0;
function changeRecommendedRecordings () {
		monitor_time = setInterval(function() {
			setRecommendedRecordings( being_liked_recording_title_innerhtml_list, being_liked_recording_file_html_id_list);
		}, 1000);
	};

function setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list)
{	
	var curr_time = new Date();
	var curr_hour = curr_time.getHours();
	var curr_min  = curr_time.getMinutes();
	var curr_sec  = curr_time.getSeconds();

	//console.log("mike check check);
	if (curr_hour ==16 && curr_min == 43 && curr_sec ==0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 0, 0, 6);
	} 

	if (curr_hour == 16 && curr_min == 43 && curr_sec == 10) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 1, 1, 9);
	} 

	if (curr_hour == 16 && curr_min == 43 && curr_sec == 20) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 2, 0, 6);
	} 

	if (curr_hour == 16 && curr_min == 43 && curr_sec == 30) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 3, 1, 6);
	} 

	if (curr_hour == 16 && curr_min == 43 && curr_sec == 40) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 0, 0, 6);
	} 

	if (curr_hour == 26 && curr_min == 43 && curr_sec == 50) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 1, 1, 6);
	} 

};

//helper function
function helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, recording_title_index, recording_file_index, hour) {
		console.log("time to change recommended recording for " + hour);

		//change the title
		var link_title = document.getElementById("recommended_meditation_recording_link_9809403065");
		link_title.innerHTML = recording_title_innerhtml_list[recording_title_index];

		//change the recording file stored in global variable
		curr_recommended_meditation_file = document.getElementById(recording_file_html_id_list[recording_file_index]);
};



//VIEW 

//assumption: 
// settigns and headsapce page are hidden.  
// meditations page is shown
// individual_meditation_recording_player_9809403065 is hidden by default


function show_meditation_recording_player() {
	hide_meditations_page();
	$('.individual_meditation_recording_player_9809403065').show();
	$('html').addClass('individual_meditation_recording_player_background');
	$('body').addClass('individual_meditation_recording_player_body');

	$('#bottom_fixed_nav_bar_9809403065').hide();
}

function hide_meditation_recording_player() {
	// stop the media player
	$('html').removeClass('individual_meditation_recording_player_background');
	$('body').removeClass('individual_meditation_recording_player_body');

	$('.individual_meditation_recording_player_9809403065').hide();

	//reshow the fixed bottom nav bar
	$('#bottom_fixed_nav_bar_9809403065').show();
}


/////////////////////////////////////////////////////////////////////////
///////////////////////////LOGIC OF THE MEDIA PLAYER FOR RECORDING OF MEDITATION//////////////////////////////////////////////


 // when user click either an element of class 'recommended_meditation_recording_9809403065' of of class 'recording_track_a_of_list_a_980940306', open the individual_meditation_recording_player_9809403065 AND play the meditation recording

//BUGS:
//when time is too short, fading out operation wont; end
 
// at the end, ui that fades won't show up


var inside_meditation_session = false;
var recording_is_playing = false;
var chosen_recording = 0;
var recording_is_started = false;
var recording_ended = false;



// pressing space bar to pause/play a recording
//space bar only works to pause/play a recording when we are inside a meditation session
//selector 'body' should be .individual_meditation_recording_player_body class selector instead


function mediaPlayer () {
	$('html').keydown(function (event) {
		event.stopImmediatePropagation();
		if (event.which == 32) {

			//playing from 00:00, i.e this space bar keydown signals the first time we play this recording since the last time the same recording concludes (and not just paused)
			if (inside_meditation_session == true && recording_is_started == false) {
				recording_ended = false;
				setTimeout(function(){ nonInitialfadeOutWhenInactive(); }, 10000);
				curr_recommended_meditation_file.play();
				recording_is_playing = true;
				var recording = curr_recommended_meditation_file;
				// recording.addEventListener("timeupdate", updateProgressBarAndAudio);
				recording_is_started = true;
				//console.log(" inside_meditation_session is " + inside_meditation_session);
				//console.log(" recording_is_started is " + recording_is_started);
				//console.log(" recording_is_playing is " + recording_is_playing);
			}
			else if (inside_meditation_session == true) {	
				var recording = curr_recommended_meditation_file;
				if (recording_is_playing == true) {
					recording.pause();
					recording_is_playing = false;
					console.log('pausing');
					//console.log(" inside_meditation_session is " + inside_meditation_session);
					//console.log(" recording_is_started is " + recording_is_started);
					//console.log(" recording_is_playing is " + recording_is_playing);
				}
				else {
					recording.play();
					recording_is_playing = true;
					console.log('playing/resuming');
					//console.log(" inside_meditation_session is " + inside_meditation_session);
					//console.log(" recording_is_started is " + recording_is_started);
					//console.log(" recording_is_playing is " + recording_is_playing);
					//console.log("count is " + count);
				}
			}; 
			
		}
		
	});
};


$('#recommended_meditation_recording_link_9809403065, #recommended_meditation_recording_begin_button_9809403065').on('click', function(event) {
	hide_meditations_page();
	show_meditation_recording_player();

	//space bar is activated as the play/pause button
	resetMediaPlayerStateThenPlay();
	
	//$('.individual_meditation_recording_player_background').css("animation-play-state","running");
});

// $('.recording_track_a_of_list_a_9809403065').on('click', function(event) {
// 	hide_meditations_page();
// 	show_meditation_recording_player();
// 	var recording = document.getElementById("zenbellsound");
// 	recording.play();
// 	recording_is_playing = true;
// 	inside_meditation_session = true;
// });

//WHEN USER CLICKS 'X' BUTTON
$('#recording_player_close_button_9809403065').on('click', function(event) {
	hide_meditation_recording_player();
	$('.individual_meditation_recording_player_9809403065').hide();
	show_meditations_page();
	//disable the media player and reset the audio
	inside_meditation_session = false;
	recording_is_started = false;
	recording_is_playing = false;
	recording_ended = true;
	curr_recommended_meditation_file.currentTime = 0;	
	curr_recommended_meditation_file.pause();
	
});

//helper function: after the recording file is done, reove the mousemove eevnt and turn opacity to 1
function endFadeWhenInactive() {
	recording_is_playing == false;
	$('html').off('mousemove');
	$(".fade_when_user_inactive").css("opacity", 1);
	console.log ('recording file is done playing');
}

//update progress bar, which also ends fading in and out of the media player
curr_recommended_meditation_file.addEventListener("timeupdate", updateProgressBarAndAudio);

function updateProgressBarAndAudio() {
	var recording_file = curr_recommended_meditation_file;
	var length = recording_file.duration; //unit: seconds
	var current_time = recording_file.currentTime; //https://www.w3schools.com/tags/av_prop_currenttime.asp

	// calculate total length of value ansd set it for end time html element
	var totalLength = calculateTotalValue(length)
	//$(".end-time").html(totalLength);

	// calculate current value time and set it for start-time html element
	var currentTime = calculateCurrentValue(current_time);
	//$(".start-time").html(currentTime);

	var progressbar = document.getElementById('seekObj');
	progressbar.value = (recording_file.currentTime / recording_file.duration);
	progressbar.addEventListener("click", seek);

	//users reach the end of the meditation recording:
	//reset the progress bar
	if (recording_file.currentTime == recording_file.duration) {
	 	progressbar.value = 1;
	 	endFadeWhenInactive();

	 	recording_file.pause();
	 	recording_file.currentTime = 0;	
	 	recording_is_playing = false;
	 	recording_ended = true;
		
	}

	function seek(evt) {
	var percent = evt.offsetX / this.offsetWidth;
	recording_file.currentTime = percent * recording_file.duration;
	progressbar.value = percent / 100;
	}

};

//wait for user inactivity (mouse and key) of x seconds before fading out.  after that, if user move themouse but then go quiet for y seconds again, then fade out the elements.
//the key here is that this function is only triggered if there is an initial user interactivity

// function fadeOutWhenInactive () {
// 	var time_idle = 0;

// 	//run etectInitialUserInactivity every second
// 	var keep_visible = setInterval(detectInitialUserInactivity, 1000);

// 	function myStopFunction() {
// 		console.log("clear interval");
// 			clearInterval(keep_visible);
// 	};

// 	function detectInitialUserInactivity() {
// 		// reset time idle if there is user activity
// 		console.log("time idle is " + time_idle);
// 		$("html").on("mousemove", function () {
// 			time_idle = 0;
// 			console.log("user activity detected, time idle reset to " + time_idle);
// 		});
// 		//var activity = await user_input_event;

// 		//if user is inactive for more than 7 seconds, end this function
// 		// and transfer control to fadeOutWhenInactive()
// 		time_idle += 1000;
// 		if (time_idle > 7000) {
// 			console.log("time idle passes threshold, make item transparent"); 
// 			myStopFunction();
// 			nonInitialfadeOutWhenInactive();
// 		}

// 	};
// };

function exec() {
	// first time item is made transparent after the rcording is played an no user activity is detected
	$(".fade_when_user_inactive").css("opacity", 0);

	$("html").on("mousemove", function( event ) {
		//when there is mouse movement, make the item opaque
	    $(".fade_when_user_inactive").css("opacity", 1);
	    
	    //and if  there exists a timeOut function running, stop it.
	    myStopFunction();
	    //restart a new timeOut, which waits for x seconds before making the item transaprent again
	    myFunction();
	    //console.log("byee");
	});

	//wait for x seconds before turning making the item transparent
	function myFunction() {
	    myVar = setTimeout(function(){
	        $(".fade_when_user_inactive").css("opacity", 0);
	    }, 6000);
	}
	//end the TimeOut
	function myStopFunction() {
	    if(typeof myVar != 'undefined'){
	        clearTimeout(myVar);
	        //console.log("hiii");
	    }
	}
};

function nonInitialfadeOutWhenInactive() { 
	if (recording_ended == false) {
		exec();
	}
	else return;
	
};


//helpers
// converts html DOM audio.duration (which is an integer in seconds) to a string that displays the duration in the minute and seconds format:
// exmaple: 132 seoconds turn to 2:14
//calculateTotalValue(134); 

function calculateTotalValue(length) { //length is in seconds
  var minutes = Math.floor(length / 60),
    seconds = length - minutes * 60,
    // seconds_str = seconds_int.toString(),
    // seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  // console.log("time is " + time);
  // console.log(typeof time );
  return time;
}


//displays current time in a nice "00:00" string-based format
function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
   console.log("time is " + current_time);
  return current_time;
}

async function resetMediaPlayerStateThenPlay () {

	let before_reset = new Promise((resolve, reject) => {
		//console.log("before reset, inside_meditation_session is " + inside_meditation_session);
		//console.log("before reset, recording_is_started is " + recording_is_started);
		//console.log("before reset, recording_is_playing is " + recording_is_playing);
		resolve("reset done!")
  	});
  	let result0 = await before_reset;

	let reset = new Promise((resolve, reject) => {
		inside_meditation_session = true;
		recording_is_started == false;
		recording_is_playing = false;
    	resolve("reset done!")
  	});
  	let result = await reset;

	let after_reset = new Promise((resolve, reject) => {
		//console.log("after reset, inside_meditation_session is " + inside_meditation_session);
		//console.log("after reset, recording_is_started is " + recording_is_started);
		//console.log("after reset, recording_is_playing is " + recording_is_playing);
		resolve("reset done!")
  	});
  	let result1 = await after_reset;

	let mediaPlayerReady = new Promise((resolve, reject) => {
		mediaPlayer();
    	resolve("media player ready");
  	});
	let result2 = await mediaPlayerReady;

	return Promise.resolve(1);
};


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////





// TO BE MODULARIZED ONCE WE GOT OFF OUR LAZY ASS AND READ UP ON MODULAR JS:
function hide_headspace_page() {
	;
};


function hide_settings_page () {
		$('html').removeClass();
		$('body').removeClass('settings_page_body');
		
		$(".user_profile_id_9809403065").hide();
		$(".user_profile_section_show_9809403065").hide();
		$(".user_profile_menu_show_9809403065").hide();
		$(".user_profile_section_and_menu_grid_divider_show_9809403065").hide()


};

function hide_meditations_page () {
		
		$('html').removeClass();
		$('body').removeClass('meditations_page_body');

		$('.recommended_meditation_recording_9809403065').hide()
		$('.recording_lists_9809403065').hide();
		//we should NOT need this bevause by default the below class is hidden
		// $('individual_meditation_recording_player_9809403065').hide();
};



function show_meditations_page() {
	hide_settings_page();
	hide_headspace_page();
	$('html').addClass('meditations_page_background');
	$('body').addClass('meditations_page_body');
	$(".recommended_meditation_recording_9809403065").show();
	$('.recording_lists_9809403065').show();
};


function show_settings_page() {
	hide_headspace_page();
	hide_meditations_page();

	$('html').addClass('settings_page_background');
	$('body').addClass('settings_page_body');


	$(".user_profile_id_9809403065").show();
	$(".user_profile_section_show_9809403065").show();
	$(".user_profile_menu_show_9809403065").show();
	$(".user_profile_section_and_menu_grid_divider_show_9809403065").show();

	
	//by default show the 'schedule' section
	$('#settings_options_9809403065').show();
	$('#nudge_options_9809403065').hide();
	$('#my_stats_options_9809403065').hide();

	$('#user_profile_my_stats_text_9809403065').css("color", "#a5abb8");
	$('#user_profile_my_stats_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

	$('#user_profile_settings_text_9809403065').css("color", "#5c84f1");
	$('#user_profile_settings_text_9809403065').css("border-bottom", " 2px solid #5c84f1");

	$('#user_profile_nudge_text_9809403065').css("color", "#a5abb8");
	$('#user_profile_nudge_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

};


function hide_meditations_page () {
		
		$('html').removeClass();
		$('body').removeClass('meditations_page_body');

		$('.recommended_meditation_recording_9809403065').hide()
		$('.recording_lists_9809403065').hide();
		//we should NOT need this bevause by default the below class is hidden
		// $('individual_meditation_recording_player_9809403065').hide();
};
