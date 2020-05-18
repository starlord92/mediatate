$(document).ready(function() { 

	console.log("user_profile_settings script is working");





function hide_settings_page () {
		$(".user_profile_id_9809403065").hide();
		$(".user_profile_section_show_9809403065").hide();
		$(".user_profile_menu_show_9809403065").hide();
		$(".user_profile_section_and_menu_grid_divider_show_9809403065").hide()

		$('html').removeClass();
}

function hide_meditations_page () {
		$(".recommended_meditation_recording_9809403065").hide();
		$('html').removeClass();	
}


//by defaulf we show meditations page:
hide_settings_page ();
$('html').addClass('meditations_page_background');
$(".recommended_meditation_recording_9809403065").show();




//clicking meditations page shows recommended meditations and other recordings while hiding other pages:
$('#meditations_page_9809403065').on('click', function(event) {
	hide_settings_page ();
	$('html').addClass('meditations_page_background');
	$(".recommended_meditation_recording_9809403065").show();

});

//clicking user icon shows user profile menu and section and hides other pages

$('#settings_9809403065').on('click', function(event) {
	hide_meditations_page();
	$('html').addClass('setting_page_background');
	$(".user_profile_id_9809403065").show();
	$(".user_profile_section_show_9809403065").show();
	$(".user_profile_menu_show_9809403065").show();
	$(".user_profile_section_and_menu_grid_divider_show_9809403065").show();

	
	//by default show the 'scheduled' subpage
	$('#settings_options_9809403065').hide();
	$('#nudge_options_9809403065').hide();
	$('#my_stats_options_9809403065').show();

	$('#user_profile_my_stats_text_9809403065').css("color", "#a5abb8");
	$('#user_profile_my_stats_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

	$('#user_profile_settings_text_9809403065').css("color", "#5c84f1");
	$('#user_profile_settings_text_9809403065').css("border-bottom", " 2px solid #5c84f1");

	$('#user_profile_nudge_text_9809403065').css("color", "#a5abb8");
	$('#user_profile_nudge_text_9809403065').css("border-bottom", " 2px solid #a5abb8");

	

	
	// $(this).css("background-color", "#9ee6aa");

	// $( "html" ).css( "background", "#fafafa" );


	// $('html').attr('background', function(index, attr) {

	// 	return attr == "#fafafa" ? "url('https://cdn.statically.io/gh/starlord92/mediatate/1537ecf3/images/early_dawn_background.jpg') no-repeat center center fixed" : "#fafafa";
	// });

	//by default, show the settings option page
	$('#settings_options_9809403065').show();
	$('#nudge_options_9809403065').hide();
	$('#my_stats_options_9809403065').hide();
});

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


	// $('#user_profile_settings_9809403065').on('click', function (event) {
	// 	$('#user_profile_display_box_9809403065').load("../settings_options.html", function() {
	// 	});
		
	// 	// $.ajax({
	// 	//   method: "GET",
	// 	//   url: "../settings_options.js",
	// 	//   dataType: "script"
	// 	// });

	// 	//chrome.tabs.executeScript({file:'settings_options.js'});


	// 	// var duration;
	// 	// 	chrome.storage.sync.get(['stored_medi_duration'], function(data) {
	// 	// 	          console.log('stored_medi_duration is ' + data.stored_medi_duration);
	// 	// 	          duration = data.stored_medi_duration;
	// 	// 	});

	// 	// $('#medi_duration_9809403065').attr('value',duration);

	// 	// $.getScript("../settings_options.js", function(){
	// 	//     //alert("Running test.js");
	// 	// });
	// });

//===========================================================================//


//=======SAVING ON/OFF STATE AND SETTINGS OF SCHEDULED MEDITATION=============


	$('#settings_options_save_9809403065').on('click', function (event) {
		
		console.log(" scheduled meditation settings saved");


		//see if checkbox got checked
		var scheduled_meditation_checkbox = $('#scheduled_meditation_checkbox_9809403065').prop("checked");
		//if checkbox is checked, and current status of scheduled meditation is off, then send a mesage to background script teling it to turn scheduled meditation on
		if (scheduled_meditation_checkbox) {

			chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
			    //console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
			    if (data.stored_scheduled_meditation_checkbox == false) {
			    	chrome.runtime.sendMessage({message: "turn on"}, function(r) {});
			    }
			});
		}
		//else, if checkbox is not checked, and current status of scheduled meditation is on, then send a mesage to background script teling it to turn scheduled meditation off
		else {
			chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
			   // console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
			    if (data.stored_scheduled_meditation_checkbox == true) {
			    	chrome.runtime.sendMessage({message: "turn off"}, function(r) {});
			    }
			});
		}
		
		// in either scenario, update stored_scheduled_meditation_checkbox 
		chrome.storage.sync.set({stored_scheduled_meditation_checkbox: scheduled_meditation_checkbox }, 
			function() {//console.log('scheduled meditation?  ' + scheduled_meditation_checkbox );
		});

		var work_start_time = $('#work_start_time_9809403065').val();
		var work_end_time = $('#work_end_time_9809403065').val();
		var medi_duration = $('#medi_duration_9809403065').val();
		var medi_frequency = $('#medi_frequency_9809403065').val();
		var active_medi_date =$('#active_medi_date_9809403065').val();
		var scheduled_medi_on_off = 

		chrome.storage.sync.set({stored_work_start_time: work_start_time}, function() {	
			//console.log('work start time entered is ' + work_start_time);

			//confirm user input is properly stored
			chrome.storage.sync.get(['stored_work_start_time'], function(data) {
			          //console.log('stored_work_start_time is ' + data.stored_work_start_time);
			});

		});

		chrome.storage.sync.set({stored_work_end_time: work_end_time}, 
			function() {
			//console.log('work end time is ' + work_end_time);
		});

		chrome.storage.sync.set({stored_medi_duration: medi_duration}, 
			function() {
		//console.log('the duration of each mediation period is ' + medi_duration);
		});

		chrome.storage.sync.set({stored_medi_frequency: medi_frequency}, 
			function() {
		//console.log('the frequency of each mediation period is ' + medi_frequency);
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
		var nudge_start_time = $('#nudge_start_time_9809403065').val();
		var nudge_end_time = $('#nudge_end_time_9809403065').val();
		

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



