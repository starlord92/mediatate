////////////////////////////////////////////////////////////////////////
///////////////////////////LOGIC OF THE MEDIA PLAYER FOR RECORDING OF MEDITATION//////////////////////////////////////////////


 // when user click either an element of class 'recommended_meditation_recording_9809403065' of of class 'recording_track_a_of_list_a_980940306', open the individual_meditation_recording_player_9809403065 AND play the meditation recording

var inside_meditation_session = false;
var recording_is_playing = false;
var chosen_recording = 0;


// pressing space bar to pause/play a recording
//space bar only works to pause/play a recording when we are inside a meditation session
//selector 'body' should be .individual_meditation_recording_player_body class selector instead
function mediaPlayer () {
  $('body').keydown(function (event) {
    if (inside_meditation_session == true) {
      console.log("inside_meditation_session is true.  user can play and pause using space bar");
      var recording = curr_recommended_meditation_file;
      recording.addEventListener("timeupdate", updateProgressBarAndAudio);

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
};


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
    progressbar.value = 0;
  }

  function seek(evt) {
  var percent = evt.offsetX / this.offsetWidth;
  recording_file.currentTime = percent * recording_file.duration;
  progressbar.value = percent / 100;
  }

};

$('#recommended_meditation_recording_link_9809403065, #recommended_meditation_recording_begin_button_9809403065').on('click', function(event) {
  hide_meditations_page();
  show_meditation_recording_player();
  //curr_recommended_meditation_file.play();
  //recording_is_playing = true;
  inside_meditation_session = true;
  mediaPlayer();

  //$('.individual_meditation_recording_player_background').css("animation-play-state","running");
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
  var recording = curr_recommended_meditation_file;
  recording.pause();
  curr_recommended_meditation_file.currentTime = 0; 
});


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

  console.log("time is " + time);
  console.log(typeof time );
  return time;
}


//displays current time in a nice "00:00" string-based format
function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
















// function initPlayers(num) {
//   // pass num in if there are multiple audio players e.g 'player' + i

//   for (var i = 0; i < num; i++) {
//     (function() {

//       // Variables
//       // ----------------------------------------------------------
//       // audio embed object
//       var playerContainer = document.getElementById('player-container'),
//         player = document.getElementById('player'),
//         isPlaying = false,
//         playBtn = document.getElementById('play-btn');

//       // Controls Listeners
//       // ----------------------------------------------------------
//       if (playBtn != null) {
//         playBtn.addEventListener('click', function() {
//           togglePlay()
//         });
//       }

//       // Controls & Sounds Methods
//       // ----------------------------------------------------------
//       function togglePlay() {
//         if (player.paused === false) {
//           player.pause();
//           isPlaying = false;
//           $('#play-btn').removeClass('pause');

//         } else {
//           player.play();
//           $('#play-btn').addClass('pause');
//           isPlaying = true;
//         }
//       }
//     }());
//   }
// }

// initPlayers(jQuery('#player-container').length);