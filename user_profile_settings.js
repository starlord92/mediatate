$(document).ready(function() { 

	console.log("user_profile_settings script is working");

	//clicking user icon toggles user profile & setting section on and off
	$('#user_profile_icon_9809403065').on('click', function(event) {
		
		$(".meditation_control_9809403065").toggle({duration: 0});
		$(".user_profile_section_hide_9809403065").toggleClass("user_profile_section_show_9809403065");
		$(".user_profile_menu_hide_9809403065").toggleClass("user_profile_menu_show_9809403065");
		// $(this).css("background-color", "#9ee6aa");
	});

	//clicking 'settings' reveal setting options
	$('#user_profile_settings_9809403065').on('click', function (event) {
		$('#user_profile_display_box_9809403065').load("../settings_options.html", function() {
		});
	});


	//clicking 'settings' reveal setting options
	$('#user_profile_nudge_9809403065').on('click', function (event) {
		$('#user_profile_display_box_9809403065').load("../nudge_options.html", function() {
		});
	});


	//if user change meditation schedule and click 'save', alert background.js
	$('#user_profile_display_box_9809403065').on('click', '#settings_options_save_9809403065', function (event) {
		
		console.log(" scheduled meditation settings saved");

		var scheduled_meditation_checkbox = $('#scheduled_meditation_checkbox_9809403065').prop("checked");
		chrome.storage.sync.set({stored_scheduled_meditation_checkbox: scheduled_meditation_checkbox }, 
			function() {console.log('scheduled meditation?  ' + scheduled_meditation_checkbox );
		});
		
		//if 
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  		console.log(response.farewell);
	});
 
			



		var work_start_time = $('#work_start_time_9809403065').val();
		var work_end_time = $('#work_end_time_9809403065').val();
		var medi_duration = $('#medi_duration_9809403065').val();
		var medi_frequency = $('#medi_frequency_9809403065').val();
		var active_medi_date =$('#active_medi_date_9809403065').val();
		var scheduled_medi_on_off = 

		chrome.storage.sync.set({stored_work_start_time: work_start_time}, function() {	
			console.log('work start time entered is ' + work_start_time);

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
		console.log('days of the week the extension is active: ' + active_medi_date);
		})

	
	});

}); 



