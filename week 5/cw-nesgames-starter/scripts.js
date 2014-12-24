// JavaScript Document
;(function($){
	'use scrict'

	//reference the select box
	var $game_select = $('#game-select');
	
	//reference single game display elements
	var $game_title = $('#game-title');
	var $game_image = $('#game-image');
	var $game_year = $('#game-year');
	var $game_publisher = $('#game-publisher');
	var $game_description = $('#game-description');
	
	//get a reference to the game display container
	var $game_display = $('#game-display');
	
	var display_games = function(data){
		//variable to hold an option tag
		var $option
		//make sure the select box is empty (just in case)
		$game_select.empty();
		
		//add placeholder/emply option
		$game_select.append($option);
		
		//loop over each game, making an
		//<option> tag for each
		for (var i = 0; i < data.games.length; i++){
			//create a new option
			$option = $('<option>');
			
			$option.attr('value', data.games[i].id);
			
			$option.text(data.games[i].title);
			//append the new <option> to the select box\
			$game_select.append($option);
		}
	};
	
	var display_game = function(data){
		$game_title.text(data.games[0].title);
		$game_year.text(data.games[0].year);
		$game_publisher.text(data.games[0].publisher);
		$game_description.text(data.games[0].description);
		
		$game_image.attr('src', data.games[0].box_art);
		
		$game_display.slideDown();
		
	};
	
	var get_game = function(game_id){
		//slideup game-display container
		$game_display.slideUp();
		
		//do ajax stuff here
		$.ajax({
			url: 'api.php?action=game&id=' + game_id,
			type: 'get',
			dataType: 'json',
			success: function(data, status, xhr){
				display_game(data);
			}
		
		});
	}
		$game_select.on('change', function(e){
			//grab the idea of the selceted option
			var game_id = $game_select.val();
			
			//call get_game 
			get_game(game_id);
		});
		

	//when the page loads make ajax request to
	//get all available games
	$.ajax({
		url: 'api.php?action=all_games',
		type: 'get',
		dataType: 'json',
		success: function(data, status, xhr){
			display_games(data);
		}
	});	
	
})(window.jQuery);