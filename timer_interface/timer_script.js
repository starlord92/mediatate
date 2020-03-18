
var five = 30000;

var interval;

function generateTime(timer_length) {
	five = five - 1000;     
	//algorithm: https://www.w3schools.com/howto/howto_js_countdown.asp
	var minutes = Math.floor((five % (1000 * 60 * 60))/(1000 * 60)); 
	var seconds = Math.floor((five % (1000 * 60)) / 1000);
	document.getElementById("button").innerHTML = "0" + minutes + ":" + seconds ;
}

//update the count down every 1 second
var x = function updateTimer() {     
	
	generateTime(five);

	
	if (five < 0) {         
		clearInterval(interval);
		var bell_sound = document.getElementById("zenbellsound");
		bell_sound.play();

		document.getElementById("button").innerHTML = "meditate again";

		// document.getElementById("button").addEventListener("click", start);
		// document.getElementById("button").style.cursor= "pointer";

		
	}
}


var start = function startTimer() {
	var bell_sound = document.getElementById("zenbellsound");
	bell_sound.play();
	// document.getElementById("button").removeEventListener("click", start);
	document.getElementById("button").style.cursor= "initial";
	interval = setInterval(x, 1000);

		// document.getElementById("button").addEventListener("click", start);

}


	document.getElementById("button").addEventListener("click", start);









		
