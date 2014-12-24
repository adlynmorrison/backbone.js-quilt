// JavaScript Document
//need a reference toward sandbox name
var Heartbleed = window.Heartbleed || {};

;(function($) {
	'use strict';
	
	//variable to hold an instance of our CideoGame model
	var vg;
	
	//variable to hold the seed data for our instance
	var vg_data;

	//variable to hold the html
	var vg_html;
	
	//pre-compile our template
	var vg_template = _.template($('#videogame-template').html());
	
	//reference the list to hold video games
	var $vg_list = $('#video-games');
	
	//click handler on the button
	$('#add-game').on('click', function(){
		vg_data = {
			title: 'Mario Party',
			publisher: 'Nintendo',
			release_year: 1999,
			box_art: 'http://static.giantbomb.com/uploads/original/0/2338/183539-mario_party_3__u_.jpg',
			description: 'Frantic 4-player fun!',
			platforms: ['nintendo 64', 'NES']
		};
		
		vg = new Heartbleed.VideoGame(vg_data);
		
		//send our insance of Videogame in to our template to get html
		vg_html = vg_template(vg.toJSON());
		
		//append the new html to the Dom
		$vg_list.append(vg_html);
		
	});
})(window.jQuery);