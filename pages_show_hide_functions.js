function hide_headspace_page() {
	;
}


function hide_settings_page () {
		$(".user_profile_id_9809403065").hide();
		$(".user_profile_section_show_9809403065").hide();
		$(".user_profile_menu_show_9809403065").hide();
		$(".user_profile_section_and_menu_grid_divider_show_9809403065").hide()

		$('html').removeClass();
}

function hide_meditations_page () {
		$('.recommended_meditation_recording_9809403065').hide();
		$('html').removeClass();
		$('.recording_list_a_9809403065').hide();
		//we should NOT need this bevause by default the below class is hidden
		// $('individual_meditation_recording_player_9809403065').hide();
}




function show_meditation_recording_player() {
	// hide_meditations_page();
	$('.individual_meditation_recording_player_9809403065').show();
	$('html').addClass('individual_meditation_recording_player_background');
	$('#bottom_fixed_nav_bar_9809403065').hide();
}

function hide_meditation_recording_player() {
	// stop the media player
	$('html').removeClass('individual_meditation_recording_player_background');
	$('.individual_meditation_recording_player_9809403065').hide();

	//reshow the fixed bottom nav bar
	$('#bottom_fixed_nav_bar_9809403065').show();
}

