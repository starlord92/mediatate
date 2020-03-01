//https://www.w3schools.com/howto/howto_js_countdown.asp
////

var five = 30000;

var interval;

// update the count down every 1 second

var x = function updateTimer() {
	five = five - 1000;
	var seconds = five/1000;
	document.getElementById("timer").innerHTML = seconds + "";    
	if (five < 0) {
		clearInterval(interval);
		document.getElementById("timer").innerHTML = "appoach each of your tasks without any judgment";
		
		var bell_sound = document.getElementById("zenbellsound");
		bell_sound.play();
		document.getElementById("timer").removeEventListener("click", startTimer);
		document.getElementById("timer").style.cursor= "initial";



		// var img = document.createElement("img");
		// img.src = "uzimeme.png";
		// var src = document.getElementById("meme");
		// src.appendChild(img);


	}
}

document.getElementById("timer").addEventListener("click", whynot());


var whynot = function startTimer() {
	var bell_sound = document.getElementById("zenbellsound");
	bell_sound.play();
	interval = setInterval(x, 1000);

}





		
