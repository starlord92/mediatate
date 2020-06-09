

///displaying saved and updated settings whenever user open the settings page

//user_ptofile_settings takes care of the saving and updating of data of the settings page

//helper function to convert stored_work_start_time from the 24 hour format to the am/pm format
function twenty_four_to_am_pm (time) {
	//time is an integer in the range 0-23
	if (time == 0 || time == 12){
		return 12;
	}
	else if (time >= 12  && time <= 23) {
		return (time-12);
	}
	else {return  time;}
}

//helper function: determine if an hour in the 24-hour would translate to am or pm in 12-hour clock
function am_pm_value (time) {
	if (time >=0 && time <= 11) {
		return 0;
	}
	else {return 12;}
}

$(document).ready(function() {

	///ref: https://stackoverflow.com/questions/17420534/check-uncheck-checkbox-using-jquery
	var checkbox_value;
	chrome.storage.sync.get(['stored_scheduled_meditation_checkbox'], function(data) {
	        //console.log('stored_scheduled_meditation_checkbox is ' + data.stored_scheduled_meditation_checkbox);
	        checkbox_value = data.stored_scheduled_meditation_checkbox;
	         console.log('checkbox value is ' + checkbox_value);
	        $('#scheduled_meditation_checkbox_9809403065').prop('checked',checkbox_value);
	});

	var duration;
	chrome.storage.sync.get(['stored_medi_duration'], function(data) {
	        //console.log('stored_medi_duration is ' + data.stored_medi_duration);
	        duration = data.stored_medi_duration;
	        $('#medi_duration_9809403065').val(duration);
	});

	var frequency;
	chrome.storage.sync.get(['stored_medi_frequency'], function(data) {
	        //console.log('stored_medi_frequency is ' + data.stored_medi_frequency);
	        frequency = data.stored_medi_frequency;
	        $('#medi_frequency_9809403065').val(frequency);
	});


	var start_time;
	chrome.storage.sync.get(['stored_work_start_time'], function(data) {
	        // console.log('stored_work_start_time is ' + data.stored_work_start_time);

	        //set am/pm
	        var am_pm = am_pm_value(data.stored_work_start_time);
	        $('#work_start_time_am_pm_9809403065').val(am_pm.toString());
	        //set time (12-hour clock)
	        start_time = twenty_four_to_am_pm (data.stored_work_start_time);
	        console.log('start_time being displayed to end user is ' + start_time);
	        $('#work_start_time_9809403065').val(start_time.toString());

	});


	var end_time;
	chrome.storage.sync.get(['stored_work_end_time'], function(data) {
	        // console.log('stored_work_end_time is ' + data.stored_work_end_time);

	        //set am/pm field
	        var am_pm = am_pm_value(data.stored_work_end_time);
	        $('#work_end_time_am_pm_9809403065').val(am_pm.toString());
	        //set time (12-hour clock)
	        end_time = twenty_four_to_am_pm(data.stored_work_end_time);
	        console.log('work_end_time being displayed to end user is ' + end_time);
	          $('#work_end_time_9809403065').val(end_time.toString());

	});


	// var active_date;
	// chrome.storage.sync.get(['stored_active_medi_date'], function(data) {
	//           console.log('active_medi_date is ' + data.stored_active_medi_date);
	//           active_date = data.stored_active_medi_date;
	//           $('#active_medi_date_9809403065').val(active_date);
	// });

	var nudge_checkbox_value;
	chrome.storage.sync.get(['stored_nudge_checkbox'], function(data) {
	        //console.log('stored_nudge_checkbox is ' + data.stored_nudge_checkbox);
	        nudge_checkbox_value = data.stored_nudge_checkbox;
	        $('#nudge_checkbox_9809403065').prop('checked',nudge_checkbox_value);

	});


	var nudge_start_time;
	chrome.storage.sync.get(['stored_nudge_start_time'], function(data) {
	        //console.log('stored_nudge_start_time is ' + data.stored_nudge_start_time);

	       	//set am/pm field
	        var am_pm = am_pm_value(data.stored_nudge_start_time);
	        $('#nudge_start_time_am_pm_9809403065').val(am_pm.toString());
	        //set time (12-hour clock)
	        nudge_start_time = twenty_four_to_am_pm(data.stored_nudge_start_time);
	        $('#nudge_start_time_9809403065').val(nudge_start_time.toString());
	       	console.log('nudge_start_time being displayed to end user is ' + nudge_start_time);

	});


	var nudge_end_time;
	chrome.storage.sync.get(['stored_nudge_end_time'], function(data) {
	        //console.log('stored_nudge_end_time is ' + data.stored_nudge_end_time);
	       	//set am/pm
	        var am_pm = am_pm_value(data.stored_nudge_end_time);
	        $('#nudge_end_time_am_pm_9809403065').val(am_pm.toString());

	        nudge_end_time = twenty_four_to_am_pm(data.stored_nudge_end_time);
	        $('#nudge_end_time_9809403065').val(nudge_end_time.toString());
	       	console.log('nudge_end_time being displayed to end user is ' + nudge_end_time);

	});


	//gray out scheduled meditation and nudge when their checkbox is turned 'off'
	var scheduled_meditation_checkbox = document.querySelector("input[name=scheduled_meditation_checkbox_9809403065]");

	scheduled_meditation_checkbox.addEventListener( 'change', function() {
	    if(this.checked) {
	        // Checkbox is checked..
	        document.getElementById("medi_duration_9809403065").disabled = false;
	        document.getElementById("medi_frequency_9809403065").disabled = false;
	        document.getElementById("work_start_time_9809403065").disabled = false;
	        document.getElementById("work_start_time_am_pm_9809403065").disabled = false;
	        document.getElementById("work_end_time_9809403065").disabled = false;
	        document.getElementById("work_end_time_am_pm_9809403065").disabled = false;
	        document.getElementById("settings_options_9809403065").style.color = "rgb(0,0,0)";


	    } else {
	        document.getElementById("medi_duration_9809403065").disabled = true;
	        document.getElementById("medi_frequency_9809403065").disabled = true;
	        document.getElementById("work_start_time_9809403065").disabled = true;
	        document.getElementById("work_start_time_am_pm_9809403065").disabled = true;
	        document.getElementById("work_end_time_9809403065").disabled = true;
	        document.getElementById("work_end_time_am_pm_9809403065").disabled = true;
	        
	        $("#settings_options_9809403065").css("color", "rgb(156,156,157)");
	        $("label[for='scheduled_meditation_9809403065'").css("color", "rgb(0,0,0)");
	    }
	});

	var nudge_checkbox = document.querySelector("input[name=nudge_checkbox_9809403065]");

	nudge_checkbox.addEventListener( 'change', function() {
	    if(this.checked) {
	        // Checkbox is checked..
	        document.getElementById("nudge_start_time_9809403065").disabled = false;
	        document.getElementById("nudge_start_time_am_pm_9809403065").disabled = false;
	        document.getElementById("nudge_end_time_9809403065").disabled = false;
	        document.getElementById("nudge_end_time_am_pm_9809403065").disabled = false;
	        document.getElementById("nudge_options_9809403065").style.color = "rgb(0,0,0)";


	    } else {
	        document.getElementById("nudge_start_time_9809403065").disabled = true;
	        document.getElementById("nudge_start_time_am_pm_9809403065").disabled = true;
	        document.getElementById("nudge_end_time_9809403065").disabled = true;
	        document.getElementById("nudge_end_time_am_pm_9809403065").disabled = true;
	 
	        $("#nudge_options_9809403065").css("color", "rgb(156,156,157)");
	        $("label[for='nudge_checkbox_9809403065'").css("color", "rgb(0,0,0)");
	    }
	});


	chrome.storage.sync.getBytesInUse(null, function(data) {

		console.log("amount of sync storage being  used in total " + data);

	});






});




	
