$(document).ready(function() {


	var recording_is_playing = false;

	var recording = document.getElementById("runningsound");

	$('body').keydown(function (event) {

		if (recording.ended == false) {	
			if (event.which == 32 && recording_is_playing == true ) {
				recording.pause();
				recording_is_playing = false;
			}
			else if (event.which == 32 &&  recording_is_playing == false) {
				recording.play();
				recording_is_playing = true;
			}
		}
	});


	$('#recording_player_close_button_9809403065').on('click', function(event) {		
			chrome.runtime.sendMessage({greeting: "close the meditation recording page"}, function(response) {
			  ;
			});
		}
	);

});




