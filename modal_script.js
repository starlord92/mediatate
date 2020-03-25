//inject a modal ovelaying the distracting sites


//<div id="myModal" class="modal">

//darkening of the webpage is optional



$(document).ready(function() {
 
	$.get(chrome.extension.getURL('/modal.html'), function(data) {
	    $(data).appendTo('body');
	});
 
});
