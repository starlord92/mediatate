//inject modal.html, a modal ovelaying the distracting sites.
$(document).ready(function() {
 
	$.get(chrome.extension.getURL('/iframe.html'), function(data) {
	    $(data).appendTo('body');
	});
 
});













