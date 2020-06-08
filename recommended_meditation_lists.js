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

var being_liked_recording_file_html_id_list = ["runningsound", "zenbellsound", "bright_metal_tune_mallet"];

var curr_recommended_meditation_file = 0;

$(document).ready(function() { 
	console.log("recommended_meditation_lists.js script is loaded");

	changeRecommendedRecordings();


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


//////////////////////////////////////////////////////////////////////////
//////////////////////INDIVIDUAL MEDITATION RECORDING SUBPAGE//////////////


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



 // when user click either an element of class 'recommended_meditation_recording_9809403065' of of class 'recording_track_a_of_list_a_980940306', open the individual_meditation_recording_player_9809403065 AND play the meditation recording

var inside_meditation_session = false;
var recording_is_playing = false;
var chosen_recording = 0;

//space bar only works to pause/resume a recording when we are inside a meditation session:

	$('body').keydown(function (event) {
		if (inside_meditation_session == true) {
			console.log("inside_meditation_session is true.  can play and pause using space bar");
			var recording = document.getElementById("zenbellsound");

			if (event.which == 32 && recording_is_playing == true ) {
				recording.pause();
				recording_is_playing = false;
			}
			else if (event.which == 32 &&  recording_is_playing == false) {
				recording.play();
				recording_is_playing = true;
			}
		}; 
	});



$('#recommended_meditation_recording_link_9809403065, #recommended_meditation_recording_begin_button_9809403065').on('click', function(event) {
	hide_meditations_page();
	show_meditation_recording_player();
	curr_recommended_meditation_file.play();
	recording_is_playing = true;
	inside_meditation_session = true;
});

$('.recording_track_a_of_list_a_9809403065').on('click', function(event) {
	hide_meditations_page();
	show_meditation_recording_player();
	var recording = document.getElementById("zenbellsound");
	recording.play();
	recording_is_playing = true;
	inside_meditation_session = true;
});

//WHEN USER CLICKS 'X' BUTTON
$('#recording_player_close_button_9809403065').on('click', function(event) {
	hide_meditation_recording_player();
	$('.individual_meditation_recording_player_9809403065').hide();
	show_meditations_page();
	inside_meditation_session = false;
	var recording = document.getElementById("zenbellsound");
	recording.pause();
	recording.currentTime = 0;	
});


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
