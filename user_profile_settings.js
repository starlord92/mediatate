$(document).ready(function() { 

	console.log("user_profile_settings script is working");

	//by defaulf we show meditations page:

	//NEED TO ASYNC THIS SEQUENCE
	$('.individual_meditation_recording_player_9809403065').hide();
	hide_headspace_page();
	
	hide_settings_page ();

	show_meditations_page();



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

///////////////fixed bottom bar nav allows us to switch bewteen pages//////////

//clicking meditations page shows recommended meditations and other recordings while hiding other pages:
$('#meditations_page_9809403065').on('click', function(event) {

	hide_settings_page (); 
	show_meditations_page();

});

//clicking user icon shows user profile menu and section and hides other pages

$('#settings_9809403065').on('click', function(event) {

	hide_meditations_page (); 
	show_settings_page();


});

//////////////////////////////////////////////////////////////////////////


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


// current list of recordings are taken from home.html.  we can change the links there.
//
// 	warming up & getting the right mindset
var warmup_mindset = document.getElementById("runningsound");
// 	reading documentations
// 	debugging
// 	writing code,
// 	general breathing, 
// 	general walking, 
// 	eneral eating.


// $('#recommended_meditation_recording_link_9809403065').on('click', function(event) {
// 	hide_meditations_page();
// 	show_meditation_recording_player();
// 	var recording = warmup_mindset;
// 	recording.play();
// 	recording_is_playing = true;
// 	inside_meditation_session = true;
// });

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








//========USER INTERACTION WITH THE MENU: MY STATS * SETTINGS * NUDGE======

	//clicking 'my stats' reveal current stats
	$('#user_profile_my_stats_9809403065').on('click', function (event) {
		$('#settings_options_9809403065').hide();
		$('#nudge_options_9809403065').hide();
		$('#my_stats_options_9809403065').show();

		$('#user_profile_my_stats_text_9809403065').css("color", "#5c84f1");
		$('#user_profile_my_stats_text_9809403065').css("border-bottom", " 2px solid #5c84f1");

		$('#user_profile_settings_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_settings_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

		$('#user_profile_nudge_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_nudge_text_9809403065').css("border-bottom", " 2px solid #a5abb8");
	});

	//clicking 'settings' reveal previously saved setting options
	$('#user_profile_settings_9809403065').on('click', function (event) {
		$('#nudge_options_9809403065').hide();
		$('#my_stats_options_9809403065').hide();
		$('#settings_options_9809403065').show();

		$('#user_profile_my_stats_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_my_stats_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

		$('#user_profile_settings_text_9809403065').css("color", "#5c84f1");
		$('#user_profile_settings_text_9809403065').css("border-bottom", " 2px solid #5c84f1");

		$('#user_profile_nudge_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_nudge_text_9809403065').css("border-bottom", " 2px solid #a5abb8");


		//console.log('HI HI HI HI');
	});


	//clicking 'nudge' reveal setting options
	$('#user_profile_nudge_9809403065').on('click', function (event) {
		$('#settings_options_9809403065').hide();
		$('#nudge_options_9809403065').show();
		$('#my_stats_options_9809403065').hide();


		$('#user_profile_my_stats_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_my_stats_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

		$('#user_profile_settings_text_9809403065').css("color", "#a5abb8");
		$('#user_profile_settings_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

		$('#user_profile_nudge_text_9809403065').css("color", "#5c84f1");
		$('#user_profile_nudge_text_9809403065').css("border-bottom", " 2px solid #5c84f1");
	});

//===========================================================================//





//=======SAVING ON/OFF STATE AND SETTINGS OF SCHEDULED MEDITATION=============


	$('#settings_options_save_9809403065').on('click', function (event) {
		
		console.log(" scheduled meditation settings saved");


		//see if checkbox got checked
		var scheduled_meditation_checkbox = $('#scheduled_meditation_checkbox_9809403065').prop("checked");
		//if checkbox is checked, and current status of scheduled meditation is off, then send a mesage to background.js script teling it to turn scheduled meditation on
		if (scheduled_meditation_checkbox) {

			chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
			    //console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
			    if (data.stored_scheduled_meditation_checkbox == false) {
			    	chrome.runtime.sendMessage({message: "turn on scheduled meditation"}, function(r) {});
			    }
			});
		}
		//else, if checkbox is not checked, and current status of scheduled meditation is on, then send a mesage to background script teling it to turn scheduled meditation off
		else {
			chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
			   // console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
			    if (data.stored_scheduled_meditation_checkbox == true) {
			    	chrome.runtime.sendMessage({message:  "turn off scheduled meditation"}, function(r) {});
			    }
			});
		}
		
		// in either scenario, update stored_scheduled_meditation_checkbox 
		chrome.storage.sync.set({stored_scheduled_meditation_checkbox: scheduled_meditation_checkbox }, 
			function() {console.log('scheduled meditation?  ' + scheduled_meditation_checkbox );
		});

		var work_start_time = $('#work_start_time_9809403065').prop('value');
		var work_end_time = $('#work_end_time_9809403065').prop('value');
		var medi_duration = $('#medi_duration_9809403065').prop('value');
		var medi_frequency = $('#medi_frequency_9809403065').prop('value');
		var active_medi_date =$('#active_medi_date_9809403065').prop('value');
		

		chrome.storage.sync.set({stored_work_start_time: work_start_time}, function() {	
			//console.log('work start time entered is ' + work_start_time);

			//confirm user input is properly stored
			chrome.storage.sync.get(['stored_work_start_time'], function(data) {
			          console.log('stored_work_start_time is ' + data.stored_work_start_time);
			});

		});

		chrome.storage.sync.set({stored_work_end_time: work_end_time}, 
			function() {
			console.log('work end time is ' + work_end_time);
		});

		chrome.storage.sync.set({stored_medi_duration: medi_duration}, 
			function() {
		console.log('the duration of each mediation period is ' + medi_duration);
		});

		chrome.storage.sync.set({stored_medi_frequency: medi_frequency}, 
			function() {
		console.log('the frequency of each mediation period is ' + medi_frequency);
		});

		chrome.storage.sync.set({stored_active_medi_date: active_medi_date}, 
			function() {
		//console.log('days of the week the extension is active: ' + active_medi_date);
		})
	});

//=======SAVING SETTINGS FOR NUDGE: DISTRACTING SITES=====================


	$('#nudge_options_save_9809403065').on('click', function (event) {
		
		console.log(" nudge settings saved");

		var nudge_checkbox = $('#nudge_checkbox_9809403065').prop("checked");
		//if checkbox is checked, and current status of nudge is off, change the chrome.storage value for nudge to nudge to on.  nudge_content script will read this value and enable/disable nudge accordingly
		if (nudge_checkbox) {
			chrome.storage.sync.get(['stored_nudge_checkbox'], function(data){
			    console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox);
			    if (data.stored_nudge_checkbox == false) {
			    	
			    }
			});
		}
		//else, if checkbox is not checked, and current status is on, then send a mesage to background script teling it to turn nudge off
		else {
			chrome.storage.sync.get(['stored_nudge_checkbox'], function(data){
			    console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox);
			    if (data.stored_nudge_checkbox == true) {
			    	chrome.runtime.sendMessage({message: "turn off: nudge"}, function(r) {});
			    }
			});
		}
		
		// in either scenario, update stored_scheduled_meditation_checkbox 
		chrome.storage.sync.set({stored_nudge_checkbox: nudge_checkbox}, 
			function() {console.log(' nudge on? ' + nudge_checkbox );
		});

		//store times
		var nudge_start_time = $('#nudge_start_time_9809403065').prop('value');
		var nudge_end_time = $('#nudge_end_time_9809403065').prop('value');
		

		chrome.storage.sync.set({stored_nudge_start_time: nudge_start_time}, function() {	
			//console.log('work start time entered is ' + work_start_time);
			//confirm user input is properly stored
			chrome.storage.sync.get(['stored_nudge_start_time'], function(data){
			        console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);
			});

		});

		chrome.storage.sync.set({stored_nudge_end_time: nudge_end_time}, 
			function() {
			console.log('work end time is ' + data.nudge_end_time);
		});



	
	});

});





