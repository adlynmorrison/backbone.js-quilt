;(function($) {
	'use strict';
	//start with this configeration setting
	//sending this to init and calling it config. Remember, the name is abritrary. 
	var oemiv_config = {
		video_thumbnail_container: $('#video-list'),
		video_display_title: $('#video-title'),
		video_display_description: $('#video-description'),
		video_display_embed: $('#video-embed'),
		video_thumbnail_template: $('#video-template')
	};
	/*
	The above sandbox isn't actually doing anything yet. Below we explicitly
	tell or Oemiv sandbox to initialize.
	*/
	Oemiv.init(oemiv_config);
})(window.jQuery);