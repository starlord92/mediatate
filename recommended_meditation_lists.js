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

var recommended_recording_title_innerhtml_list = [

"The Wake Up: Someone Like(s) You",
"The Warm Up: Theory of being Liked",
"Lunch Hours: Take a (Cafeteria) Seat",
"Dinner Time: Eating Alone",
"The Evening Chat: The Courage to be Disliked"

];

var recommended_recording_file_html_id_list = ["1rec3min", "2rec3min", "3rec3min", "4rec3min", "5rec3min"];
//var curr_recommended_meditation_file = "default_error";
var curr_recommended_meditation_file = "1rec1min";
// var curr_recommended_meditation_file = "bright_metal_tune_mallet";
// var curr_recommended_meditation_file = "andrew_scheduled_meditation_reminder";



$(document).ready(function() { 
	console.log("recommended_meditation_lists.js script is loaded");

	// changeRecommendedRecordings();


});

var  monitor_time = 0;
function changeRecommendedRecordings () {
		monitor_time = setInterval(function() {
			setRecommendedRecordings( recommended_recording_title_innerhtml_list, recommended_recording_file_html_id_list);
		}, 1000);
	};

function setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list)
{	
	var curr_time = new Date();
	var curr_hour = curr_time.getHours();
	var curr_min  = curr_time.getMinutes();
	var curr_sec  = curr_time.getSeconds();

	//console.log("mike check check);
	if (curr_hour ==14 && curr_min == 43 && curr_sec ==0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 0, 0, 6);
	} 

	if (curr_hour == 14 && curr_min == 43 && curr_sec == 0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 1, 1, 9);
	} 

	if (curr_hour == 14 && curr_min == 43 && curr_sec == 0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 2, 0, 6);
	} 

	if (curr_hour == 14 && curr_min == 43 && curr_sec == 0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 3, 1, 6);
	} 

	if (curr_hour == 14 && curr_min == 43 && curr_sec == 0) {
		helper_setRecommendedRecordings(recording_title_innerhtml_list, recording_file_html_id_list, 0, 0, 6);
	} 

	if (curr_hour == 14 && curr_min == 43 && curr_sec == 0) {
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
		curr_recommended_meditation_file = recording_file_html_id_list[recording_file_index];
		console.log("curr_recommended_meditation_file as updated by the second is " + curr_recommended_meditation_file);
};



//VIEW / LOOK

//assumption: 
// settigns and headsapce page are hidden.  
// meditations page is shown
// individual_meditation_recording_player_9809403065 is hidden by default


function show_meditation_recording_player() {
	hide_meditations_page();
	$('.individual_meditation_recording_player_9809403065').show();
	$('#playback_instruction').show();
	$('html').addClass('individual_meditation_recording_player_background');
	$('body').addClass('individual_meditation_recording_player_body');

	$('#bottom_fixed_nav_bar_9809403065').hide();

	//search chrome.storage variable to determine how many minutes user sets as their default meditation period
	// chrome.storage.sync.get('stored_medi_duration', function(data) {
	// 	console.log(" the latest stored medi duration before we open the meditation window is " + data.stored_medi_duration);
	// 	//medi_frequency = parseInt(data.stored_medi_frequency, 10);

	// 	if (data.stored_medi_duration == "1") {
	// 		document.getElementById("meditation_session_length_option_1").classList.add("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_3").classList.remove("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_5").classList.remove("meditation_session_length_option_chosen");
	// 	}
	// 	else if (data.stored_medi_duration == "3") {
	// 		document.getElementById("meditation_session_length_option_1").classList.remove("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_3").classList.add("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_5").classList.remove("meditation_session_length_option_chosen");
	// 	}
	// 	else {
	// 		document.getElementById("meditation_session_length_option_1").classList.remove("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_3").classList.remove("meditation_session_length_option_chosen");
	// 		document.getElementById("meditation_session_length_option_5").classList.add("meditation_session_length_option_chosen");
	// 	}
	// });
};

function hide_meditation_recording_player() {
	// stop the media player
	$('html').removeClass('individual_meditation_recording_player_background');
	$('body').removeClass('individual_meditation_recording_player_body');

	$('#playback_instruction').hide();
	$('.individual_meditation_recording_player_9809403065').hide();

	//reshow the fixed bottom nav bar
	$('#bottom_fixed_nav_bar_9809403065').show();
	show_meditations_page();
};

var one_min_option = document.getElementById("meditation_session_length_option_1");
var three_min_option = document.getElementById("meditation_session_length_option_3");
var five_min_option = document.getElementById("meditation_session_length_option_5");

//radio button logic for the length options
one_min_option.addEventListener("click", function() {
		three_min_option.classList.remove("meditation_session_length_option_chosen");
		five_min_option.classList.remove("meditation_session_length_option_chosen");
		one_min_option.classList.add("meditation_session_length_option_chosen");
		console.log("button 1 min is clicked");
	}
);

three_min_option.addEventListener("click", function() {
		one_min_option.classList.remove("meditation_session_length_option_chosen");
		five_min_option.classList.remove("meditation_session_length_option_chosen");
		three_min_option.classList.add("meditation_session_length_option_chosen");
		console.log("button 3 min is clicked");
	}
);

five_min_option.addEventListener("click", function() {
		one_min_option.classList.remove("meditation_session_length_option_chosen");
		three_min_option.classList.remove("meditation_session_length_option_chosen");
		five_min_option.classList.add("meditation_session_length_option_chosen");
		console.log("button 5 min is clicked");
	}
);








//toggle changes the word guided to unguided and vice versa
var guided_unguided_toggle = document.getElementById("toggle_9809403065");
var toggle_text = document.getElementsByClassName("meditation_session_toggle_text")[0];
guided_unguided_toggle.addEventListener( 'change', function() {
    if(this.checked) {
        //toggle_text.innerHTML = "guided";
        toggle_text.style.opacity = 1;
    } else {
        //toggle_text.innerHTML = "guided";
        toggle_text.style.opacity = 0.3;
    }

    // if(this.checked) {
    //     //toggle_text.innerHTML = "guided";
    //     toggle_text.style.opacity = 1;
    // } else {
    //     //toggle_text.innerHTML = "unguided";
    //     toggle_text.style.opacity = 0;
    // }
});



/////////////////////////////////////////////////////////////////////////
///////////////////////////LOGIC OF THE MEDIA PLAYER FOR RECORDING OF MEDITATION//////////////////////////////////////////////


 // when user click either an element of class 'recommended_meditation_recording_9809403065' of of class 'recording_track_a_of_list_a_980940306', open the individual_meditation_recording_player_9809403065 AND play the meditation recording

//BUGS:
//when time is too short, fading out operation won't stop after recording is over
 
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
			//console.log("space bar is pressed");
			//playing from 00:00, i.e this space bar keydown signals the first time we play this recording since the last time the same recording concludes (and not just paused)
			if (inside_meditation_session == true && recording_is_started == false) {
				//avoid beinginterfered with by nudge
				chrome.storage.sync.set({stored_meditation_session_in_progress_flag: true},
				            function() {
				 });
				recording_ended = false;
				setTimeout(function(){ nonInitialfadeOutWhenInactive(); }, 10000);
				//make the window full screen
				//document.documentElement.requestFullscreen();
				//figure out duration and guided/unguided status chosen by the user and choose the right recommended_meditation_file to play by checking the settings user set before pressing play
				//case 1: toggle for guided is OFF
				if (document.getElementById("toggle_9809403065").checked == false) 
				{
					//console.log("checkbox for guided meditation is unchecked");
					var chosen_duration = document.getElementsByClassName("meditation_session_length_option_chosen")[0];
					//console.log("id of length option is " + chosen_duration);
					if (chosen_duration.id == "meditation_session_length_option_1") {
						//console.log("unguided 1 minute recording playing");
						curr_recommended_meditation_file = "1minsilence";
					}
					else if (chosen_duration.id == "meditation_session_length_option_3") {
						//console.log("unguided 3 minute recording playing");
						curr_recommended_meditation_file = "3minsilence";
					}
					else {
						//console.log("unguided 5 minute recording playing");
						curr_recommended_meditation_file = "5minsilence";
						}
				}

				//case 1: toggle for guided is on
				//case 1a: the current top recommended recording is selected
				//case 1b: a recording from the playlist is selected
				else {
					console.log("checkbox for guided meditation is checked");
					var chosen_duration = document.getElementsByClassName("meditation_session_length_option_chosen")[0];
					//console.log("id of length option is " + chosen_duration);
					if (chosen_duration.id == "meditation_session_length_option_1") 
					{
						curr_recommended_meditation_file = replaceAt(curr_recommended_meditation_file, 4, "1");
						console.log("guided 1 minute recording playing.");
					}
					else if (chosen_duration.id == "meditation_session_length_option_3") {
						curr_recommended_meditation_file = replaceAt(curr_recommended_meditation_file, 4, "3");
						console.log("guided 3 minute recording playing.");
					}
					else {
						curr_recommended_meditation_file = replaceAt(curr_recommended_meditation_file, 4, "5");
						console.log("guided 5 minute recording playing. ");
						}
	
				}
												//timeupdate event track the current time of the audio file while its playing in order to update the progress bar, which also ends fading in and out of the media player after the recoding completes
				document.getElementById(curr_recommended_meditation_file).addEventListener("timeupdate", updateProgressBarAndAudio);
				//fade out the time and guided/unguided toggle and show the progress bar, ideally BEFORE playing the chosen audio file
				fadeSettingsShowProgressBar();
				document.getElementById(curr_recommended_meditation_file).play();
				
				recording_is_playing = true;
				recording_is_started = true;

			}
			else if (inside_meditation_session == true) {	
				var recording = document.getElementById(curr_recommended_meditation_file);
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



	async function fadeSettingsShowProgressBar(){
		console.log("fadeSettingsShowProgressBar running ");
		let step_one = new Promise((resolve, reject) => {
		   $('.meditation_session_settings_options').css("opacity", 0);
		   $('#playback_instruction').css("color", "rgb(116, 102, 97)");
		   setTimeout(() => resolve("done!"), 1000);
		 });
		let wait_one = await step_one;

		let step_two = new Promise((resolve, reject) => {
			//$('.meditation_session_settings_options').hide();
		   	setTimeout(() => resolve("done!"), 10);
		});
		let wait_two = await step_two;
		
		let step_three = new Promise((resolve, reject) => {
			//$('.progress_bar_container').show();
		   	setTimeout(() => resolve("done!"), 0);
		});
		let wait_three = await step_three;

		let step_four = new Promise((resolve, reject) => {
		   $(".progress_bar_container").css("opacity", 1);
		   setTimeout(() => resolve("done!"), 1000);
		});
		let wait_four = await step_four;
		return Promise.resolve(1);
	};


$('#recommended_meditation_recording_link_9809403065, #recommended_meditation_recording_begin_button_9809403065').on('click', function(event) {
	setTimeout(function(){ hide_meditations_page(); }, 100);
	setTimeout(function(){ show_meditation_recording_player(); }, 100);


	recording_ended = false;
	//space bar is activated as the play/pause button
	resetMediaPlayerStateThenPlay();

	//declare the correct recording file to be played
	//curr_recommended_meditation_file=
	
	//$('.individual_meditation_recording_player_background').css("animation-play-state","running");

	//search chrome.storage variable to determine how many minutes user sets as their default meditation period
	chrome.storage.sync.get('stored_medi_duration', function(data) {
		console.log(" the latest stored medi duration before we open the meditation window is " + data.stored_medi_duration);
		//medi_frequency = parseInt(data.stored_medi_frequency, 10);

		if (data.stored_medi_duration == "1") {
			document.getElementById("meditation_session_length_option_1").classList.add("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_3").classList.remove("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_5").classList.remove("meditation_session_length_option_chosen");
		}
		else if (data.stored_medi_duration == "3") {
			document.getElementById("meditation_session_length_option_1").classList.remove("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_3").classList.add("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_5").classList.remove("meditation_session_length_option_chosen");
		}
		else {
			document.getElementById("meditation_session_length_option_1").classList.remove("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_3").classList.remove("meditation_session_length_option_chosen");
			document.getElementById("meditation_session_length_option_5").classList.add("meditation_session_length_option_chosen");
		}
	});

	

});



$('.recording_track_a_of_list_a_9809403065').on('click', function(event) {
	hide_meditations_page();
	show_meditation_recording_player();
	recording_ended = false;
	//space bar is activated as the play/pause button
	resetMediaPlayerStateThenPlay();
	
});

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
	document.getElementById(curr_recommended_meditation_file).currentTime = 0;
	document.getElementById(curr_recommended_meditation_file).pause();

	//avoid beinginterfered with by nudge
	chrome.storage.sync.set({stored_meditation_session_in_progress_flag: false},
		function() { console.log(" avoid beinginterfered with by nudge");
	});


	async function fadeProgressBarShowSettings(){
		let step_one = new Promise((resolve, reject) => {
			$('#playback_instruction').css("color", "rgb(229,158,108)");
			$("#playback_instruction").html("press space bar to play/pause");
			$(".progress_bar_container").css("opacity", 0);
		   	setTimeout(() => resolve("done!"), 0);
		 });
		let wait_one = await step_one;

		let step_two = new Promise((resolve, reject) => {
			//$('.progress_bar_container').hide();
		   	setTimeout(() => resolve("done!"), 0);
		});
		let wait_two = await step_two;
		
		let step_three = new Promise((resolve, reject) => {
		   //$('.meditation_session_settings_options').show();
		   setTimeout(() => resolve("done!"), 0);
		});
		let wait_three = await step_three;

		let step_four = new Promise((resolve, reject) => {
		   $('.meditation_session_settings_options').css("opacity", 1);
		   setTimeout(() => resolve("done!"), 0);
		});
		let wait_four = await step_four;
		return Promise.resolve(1);
	};
	fadeProgressBarShowSettings();
	
});

//helper function: after the recording file is done, reove the mousemove eevnt and turn opacity to 1
function endFadeWhenInactive() {
	recording_is_playing == false;
	$('html').off('mousemove');
	$(".fade_when_user_inactive").css("opacity", 1);
	console.log("meditation recording finished playing");
}



function updateProgressBarAndAudio() {
	console.log(" elememnt id for the audio file is " + curr_recommended_meditation_file);
	var recording_file = document.getElementById(curr_recommended_meditation_file);
	var duration = recording_file.duration; //unit: seconds
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
	 	// $('#seekObj').prop("value","1");
	 	
	 	endFadeWhenInactive();
	 	$("#playback_instruction").html("hold 'command' and press 'w' once to exit");

	 	//console.log("current time is " + current_time);
	//console.log("duration of the recording is " + duration);

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
   //console.log("time is " + current_time);
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
		recording_ended = false;
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

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//settings (guide vs unguided meditation, meditation duration)

// meditation duration radio button


$('#toggle_9809403065').on('keypress keydown keypress', function(e) {
    if(e.which == 32)
    	console.log("disable spacebar control over the toggle");
        e.preventDefault();
        return false;
});

//prevent automatic scrolling to the bottom of the page
$("body").on('keydown keydown keypress', function(e) {
  if(e.which == 32) {
    e.preventDefault();
    // return false;
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////





// TO BE MODULARIZED ONCE WE GOT OFF OUR LAZY ASS AND READ UP ON MODULAR JS:



//extend strong prototype of string to add a replace function which replaces a-character-at-a-particular-index
// String.prototype.replaceAt = function(index, replacement) {
//     return this.substr(0, index) + replacement + this.substr(index + replacement.length);
// };

// function replaceAt(string, index, replace) {
//   return string.substring(0, index) + replace + string.substring(index + 1);
// }
function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

var stringo = "1rec1min";
console.log(replaceAt(stringo, 4, "3"));



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
