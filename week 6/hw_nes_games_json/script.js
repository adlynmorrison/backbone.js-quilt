var related_games = {};

;(function($) {
	'use strict';

	// reference the select box
	var $game_select = $('#game-select');

	// reference single game display elements
	var $game_title = $('#game-title');
	var $game_image = $('#game-image');
	var $game_year = $('#game-year');
	var $game_publisher = $('#game-publisher');
	var $game_description = $('#game-description');

	// get a reference to the game display container
	var $game_display = $('#game-display');

	var display_games = function(data) {
		// variable to hold an <option> tag
		var $option;

		// make sure the select box is empty
		$game_select.empty();

		// add a placeholder/empty option
		$option = $('<option>');

		$game_select.append($option);

		// loop over each game, making an
		// <option> tag for each
		for (var i = 0; i < data.games.length; i++) {
			// create a new <option>
			$option = $('<option>');

			// set the <option>'s value
			$option.attr('value', data.games[i].id);

			// set the <option>'s text
			$option.text(data.games[i].title);

			// append the new <option> to the select box
			$game_select.append($option);
		}
	};

	var display_game = function(data) {
		// get a reference to the game (saves typing below)
		var game = data.games[0];

		// display the selected game's data on the page
		$game_title.text(game.title);
		$game_year.text(game.year);
		$game_description.html(game.description);
		$game_publisher.text(game.publisher);

		$game_image.attr('src', game.box_art);

		// show the $game_display container
		$game_display.slideDown();
		
		//call get_related_games
		var get_related_games = function(game) {
			
			var $li;
			
			$a = $('<a>');
			
			a.text(data.games[i].title)
			
			a.attr('href', '#');
			
			a.datatype('game-id', data.games[i].id);			
			
			for (var i = 0; i < data.games.length; i++){
			
			$li.text(data,games[i].title);
			
			$related_games.append($li);
			}
		};
	};
	
	$related_games.on(click, 'a', function(a){
		e.preventDefault();
		
		var game_id = $(this).data('game-id');
		
		//get the game
		get_game(game_id);
	});
	
	var display_related_games = function(data){
		console.log(data);
	};

	var get_game = function(game_id) {
		 $related_games.empty();
		
		// do ajax stuff here
		$.ajax({
			url: 'api.php?action=game&id=' + game_id,
			type: 'get',
			dataType: 'json',
			success: function(data, status, xhr) {
				display_game(data);
			}
		});
	};

	// event listener on the select box
	$game_select.on('change', function(e) {
		// hide the game display container while we get a new game
		$game_display.slideUp();

		// grab the id of the selected option
		var game_id = $game_select.val();

		// call get_game, padding in game_id
		get_game(game_id);
	});

	// When the page loads, make an AJAX request to
	// get all available games.
	$.ajax({
		url: 'api.php?action=all_games',
		type: 'get',
		dataType: 'json',
		success: function(data, status, xhr) {
			display_games(data);
		}
	});

	$.ajax({
		url: 'api.php?action=related_games&publisher=' + game.publisher + '&id=' + game.id,
		type: 'get',
		dataType: 'json',
		success: function(data, status, xhr) {
			display_related_games (data);
		}
	});
})(window.jQuery);

//http://iam.colum.edu/students/adlyn.morrison/ASWM/week%206/hw_nes_games_json/index.html