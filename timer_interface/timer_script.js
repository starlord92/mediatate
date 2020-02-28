
	
	var five = 6000;

	// Update the count down every 1 second
	var x = setInterval(function() {
	five = five - 1000;
	var seconds = five/1000;
	// Output the result
	document.getElementById("timer").innerHTML = seconds + "";    
		if (five < 0) {
			clearInterval(x);
			document.getElementById("timer").innerHTML = "time is up";
		}
	}, 1000);
		
