$(document).ready(function() {


	var checkbox_value;
	chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data) {
	          console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
	          checkbox_value = data.stored_scheduled_meditation_checkbox;
	          $('#scheduled_meditation_checkbox_9809403065').attr('value',checkbox_value);

	});

	var duration;
	chrome.storage.sync.get(['stored_medi_duration'], function(data) {
	          console.log('stored_medi_duration is ' + data.stored_medi_duration);
	          duration = data.stored_medi_duration;
	          $('#medi_duration_9809403065').attr('value',duration);

	});

	var frequency;
	chrome.storage.sync.get(['stored_medi_frequency'], function(data) {
	          console.log('stored_medi_frequency is ' + data.stored_medi_frequency);
	          frequency = data.stored_medi_frequency;
	          $('#medi_frequency_9809403065').attr('value',frequency);

	});


	var start_time;
	chrome.storage.sync.get(['stored_work_start_time'], function(data) {
	          console.log('stored_work_start_time is ' + data.stored_work_start_time);
	          start_time = data.stored_work_start_time;
	          $('#work_start_time_9809403065').attr('value',start_time);

	});


	var end_time;
	chrome.storage.sync.get(['stored_work_end_time'], function(data) {
	          console.log('stored_work_end_time is ' + data.stored_work_end_time);
	          end_time = data.stored_work_end_time;
	          $('#work_end_time_9809403065').attr('value',end_time);

	});


	var active_date;
	chrome.storage.sync.get(['stored_active_medi_date'], function(data) {
	          console.log('active_medi_date is ' + data.stored_active_medi_date);
	          active_date = data.stored_active_medi_date;
	          $('#active_medi_date_9809403065').attr('value',active_date);

	});





});




	
