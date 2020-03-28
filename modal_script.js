
//inject modal.html, a modal ovelaying the distracting sites.
$(document).ready(function() {
 
	$.get(chrome.extension.getURL('/modal.html'), function(data) {
	    $(data).appendTo('body');
	});
 
});


// Get the modal
	var modal = document.getElementById("myModal");
	// Get the <span> element that closes the modal
	// var span = document.getElementsByClassName("close")[0];


var time = 3000;

var interval;

function generateTime(timer_length) {
	time = time - 1000;     
	var minutes = Math.floor((time % (1000 * 60 * 60))/(1000 * 60)); 
	var seconds = Math.floor((time % (1000 * 60)) / 1000);
	document.getElementById("timer_control").innerHTML = "0" + minutes + ":" + seconds ;
}

//update the count down every 1 second
var x = function updateTimer() {     
	
	generateTime(time);

	if (time < 0) {         
		clearInterval(interval);
		// var bell_sound = document.getElementById("zenbellsound");
		// bell_sound.play();

		//bring user back to their work website
		var quit_site_button = document.getElementById("timer_control")
		quit_site_button.innerHTML = "return to work";
		quit_site_button.style.cursor= "pointer";
		quit_site_button.addEventListener("click", function() {
				window.location = "https://www.google.com";
			}
		);	
	}	
};


function startTimer() {
	var bell_sound = document.getElementById("zenbellsound");
	// bell_sound.play();
	// document.getElementById("timer_control").style.cursor= "initial";
	interval = setInterval(x, 1000);
}


window.onload = function () {
  	startTimer();
};


console.log('timer script running ' + time);
