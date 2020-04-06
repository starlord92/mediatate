$(document).ready(function() { 

	console.log("user_profile_settings script is working");

	//clicking user icon toggles user profile & setting section on and off
	$('#user_profile_icon_9809403065').on('click', function(event) {
		
		$(".meditation_control_9809403065").toggle({duration: 0});
		$(".user_profile_section_hide_9809403065").toggleClass("user_profile_section_show_9809403065");
		$(".user_profile_menu_hide_9809403065").toggleClass("user_profile_menu_show_9809403065");
		// $(this).css("background-color", "#9ee6aa");
	});

	//clicking 'settings' reveal previously saved setting options
	$('#user_profile_settings_9809403065').on('click', function (event) {
		$('#user_profile_display_box_9809403065').load("../settings_options.html", function() {
		});
		
		// $.ajax({
		//   method: "GET",
		//   url: "../settings_options.js",
		//   dataType: "script"
		// });

		//chrome.tabs.executeScript({file:'settings_options.js'});


		// var duration;
		// 	chrome.storage.sync.get(['stored_medi_duration'], function(data) {
		// 	          console.log('stored_medi_duration is ' + data.stored_medi_duration);
		// 	          duration = data.stored_medi_duration;
		// 	});

		// $('#medi_duration_9809403065').attr('value',duration);

		// $.getScript("../settings_options.js", function(){
		//     //alert("Running test.js");
		// });
	});




	//clicking 'nudge' reveal setting options
	$('#user_profile_nudge_9809403065').on('click', function (event) {
		$('#user_profile_display_box_9809403065').load("../nudge_options.html", function() {
		});
	});


	$('#settings_options_save_9809403065').on('click', function (event) {
		
		console.log(" scheduled meditation settings saved");

		//==========resolve on/off status of scheduled meditation=========//

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


	//if user change meditation schedule and click 'save', talk to background script
	// $('#user_profile_display_box_9809403065').on('click', '#settings_options_save_9809403065', function (event) {
		
	// 	//console.log(" scheduled meditation settings saved");

	// 	//==========resolve on/off status of scheduled meditation=========//

	// 	//see if checkbox got checked
	// 	var scheduled_meditation_checkbox = $('#scheduled_meditation_checkbox_9809403065').prop("checked");
	// 	//if checkbox is checked, and current status of scheduled meditation is off, then send a mesage to background script teling it to turn scheduled meditation on
	// 	if (scheduled_meditation_checkbox) {

	// 		chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
	// 		    //console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
	// 		    if (data.stored_scheduled_meditation_checkbox == false) {
	// 		    	chrome.runtime.sendMessage({message: "turn on"}, function(r) {});
	// 		    }
	// 		});
	// 	}
	// 	//else, if checkbox is not checked, and current status of scheduled meditation is on, then send a mesage to background script teling it to turn scheduled meditation off
	// 	else {
	// 		chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data){
	// 		   // console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
	// 		    if (data.stored_scheduled_meditation_checkbox == true) {
	// 		    	chrome.runtime.sendMessage({message: "turn off"}, function(r) {});
	// 		    }
	// 		});
	// 	}
		
	// 	// in either scenario, update stored_scheduled_meditation_checkbox 
	// 	chrome.storage.sync.set({stored_scheduled_meditation_checkbox: scheduled_meditation_checkbox }, 
	// 		function() {//console.log('scheduled meditation?  ' + scheduled_meditation_checkbox );
	// 	});
 
			



	// 	var work_start_time = $('#work_start_time_9809403065').val();
	// 	var work_end_time = $('#work_end_time_9809403065').val();
	// 	var medi_duration = $('#medi_duration_9809403065').val();
	// 	var medi_frequency = $('#medi_frequency_9809403065').val();
	// 	var active_medi_date =$('#active_medi_date_9809403065').val();
	// 	var scheduled_medi_on_off = 

	// 	chrome.storage.sync.set({stored_work_start_time: work_start_time}, function() {	
	// 		//console.log('work start time entered is ' + work_start_time);

	// 		//confirm user input is properly stored
	// 		chrome.storage.sync.get(['stored_work_start_time'], function(data) {
	// 		          //console.log('stored_work_start_time is ' + data.stored_work_start_time);
	// 		});

	// 	});


	// 	chrome.storage.sync.set({stored_work_end_time: work_end_time}, 
	// 		function() {
	// 		//console.log('work end time is ' + work_end_time);
	// 	});

	// 	chrome.storage.sync.set({stored_medi_duration: medi_duration}, 
	// 		function() {
	// 	//console.log('the duration of each mediation period is ' + medi_duration);
	// 	});

	// 	chrome.storage.sync.set({stored_medi_frequency: medi_frequency}, 
	// 		function() {
	// 	//console.log('the frequency of each mediation period is ' + medi_frequency);
	// 	});

	// 	chrome.storage.sync.set({stored_active_medi_date: active_medi_date}, 
	// 		function() {
	// 	//console.log('days of the week the extension is active: ' + active_medi_date);
	// 	})

	
	// });

}); 



