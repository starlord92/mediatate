//https://www.w3schools.com/howto/howto_js_countdown.asp
	
	var five = 6000;

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

	function startTimer(){
		interval = setInterval(x, 1000);	
	}



	// var five = 6000;

	// // update the count down every 1 second

	// var x = setInterval(function() {
	// 	five = five - 1000;
	// 	var seconds = five/1000;
	// 	// Output the result
	// 	document.getElementById("timer").innerHTML = seconds + "";    
	// 	if (five < 0) {

	// 		clearInterval(x);

	// 		document.getElementById("timer").innerHTML = "";
	
			

	// 		// var audio = new Audio('sound_effects/bell.mp3');
	// 		// audio.play();

	// 		var bell_sound = document.getElementById("zenbellsound");
	// 		bell_sound.play();		
	// 	}
	// }, 1000);



		
