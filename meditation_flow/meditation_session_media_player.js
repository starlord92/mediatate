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

function initProgressBar() {
  var player = document.getElementById('player');
  var length = player.duration; //unit: seconds
  var current_time = player.currentTime; //https://www.w3schools.com/tags/av_prop_currenttime.asp

  // calculate total length of value ansd set it for end time html element
  var totalLength = calculateTotalValue(length)
  $(".end-time").html(totalLength);

  // calculate current value time and set it for start-time html element
  var currentTime = calculateCurrentValue(current_time);
  $(".start-time").html(currentTime);

  var progressbar = document.getElementById('seekObj');
  progressbar.value = (player.currentTime / player.duration);
  progressbar.addEventListener("click", seek);

  // if (player.currentTime == player.duration) {
  //   $('#play-btn').removeClass('pause');
  // }

  function seek(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  }
};

















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