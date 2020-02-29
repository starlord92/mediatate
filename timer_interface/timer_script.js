//https://www.w3schools.com/howto/howto_js_countdown.asp
//

var five = 60000;

var interval;

// update the count down every 1 second

var x = function updateTimer() {
	five = five - 1000;
	var seconds = five/1000;
	document.getElementById("timer").innerHTML = seconds + "";    
	if (five < 0) {
		clearInterval(interval);
		document.getElementById("timer").innerHTML = "approach each task without judgement";
		var bell_sound = document.getElementById("zenbellsound");
		bell_sound.play();
			
	}
}

document.getElementById("timer").addEventListener("click", startTimer);


function startTimer() {
	var bell_sound = document.getElementById("zenbellsound");
	bell_sound.play();

	interval = setInterval(x, 1000);	
}





		
