//namespace or an object, a door that our eternal api will go through
var NESGames = {};

;(function() {
    'use strict';
	
	var api_url = 'http://iam.colum.edu/jon.petto/nesgames.php';

    // standard options for all AJAX requests

    // reference to the game <select> element
    var $game_select = $('#game-select');

    // reference to the loading graphic
    var $loader = $('#game-loading');

    // reference to the entire <main> wrapper
    var $game_display = $('#game-display');

    // reference to the game display areas
    var $game_title = $('#game-title');
    var $game_image = $('#game-image');

    var $game_year = $('#game-year');
    var $game_publisher = $('#game-publisher');

    var $game_description = $('#game-description');

    // reference related games list
    var $related_games = $('#related-games');

    // Function that will populate the game <select> element with
    // the titles of all the games. This will be called only once
    // when the page loads.
    NESGames.display_games = function(data) {
        var $option;

        // make sure games select is empty
        $game_select.find('option').remove();

        // add a prompt option
        $option = $('<option>').attr('value', '').text('');

        // append the prompt option
        $game_select.append($option);

        // add an option for every game
        for (var i = 0; i < data.games.length; i++) {
            $option = $('<option>').attr('value', data.games[i].id).text(data.games[i].title);

            $game_select.append($option);
        }
    };

    // Function to retrieve data for one game based on id. This will
    // be called every time the <select> box is used.
    var get_game = function(game_id) {
        $game_display.slideUp('fast');

        $loader.fadeIn();

        // empty related games
        $related_games.empty();

        $.ajax({
            url: 'api.php?action=game&id=' + game_id,
            success: function(data, status, xhr) {
                display_game(data);
            },
            error: function(xhr, status, error) {
                console.log(error);
            },
            complete: function() {
                $loader.fadeOut();
            }
        });
    };

    // Function to display a single game. This will be called every
    // time the <select> box is used, after "get_game" is called.
    var display_game = function(data) {
        // get a reference to the single game
        var game = data.games[0];

        // set the title and box art values
        $game_title.text(game.title);
        $game_image.attr('src', game.box_art);

        // set the release year and publisher values
        $game_year.text(game.year);
        $game_publisher.text(game.publisher);

        // set the description
        $game_description.html(game.description);

        $game_display.slideDown('fast');

        // get all related games
        get_related_games(game);
    };

    // Function to retrieve all games from the specified publisher.
    // Called after "display_game".
    var get_related_games = function(game) {
        $loader.fadeIn();

        $.ajax({
            url: 'api.php?action=related_games&publisher=' + game.publisher + '&id=' + game.id,
            success: function(data, status, xhr) {
                display_related_games(data);
            },
            error: function(xhr, status, error) {
                console.log(error);
            },
            complete: function() {
                $loader.fadeOut();
            }
        });
    };

    // Function to display related games. Called after "get_related_games".
    var display_related_games = function(data) {
        // variables to use in our loop below
        var $li, $a;

        for (var i = 0; i < data.games.length; i++) {
            $li = $('<li>');

            $a = $('<a>');

            $a.data('game_id', data.games[i].id);
            $a.attr('href', '#');
            $a.text(data.games[i].title);

            $li.append($a);

            $related_games.append($li);
        }
    };

    // Listen for changes on the <select> box. When it's changed,
    // retrieve the selected game from our API.
    $game_select.on('change', function(e) {
        // make sure user selected a game (and not the prompt)
        if ($game_select.val() !== '') {
            get_game($game_select.val());
        }
    });

    // Listen for a click in the related games area.
    $related_games.on('click', 'a', function(e) {
        e.preventDefault();

        var game_id = $(this).data('game_id');

        get_game(game_id);

        // update the select box! fancy!
        $game_select.find('option:selected').prop('selected', false);
        $game_select.find('option[value="' + game_id + '"]').prop('selected', true);
    });

    // Display the loading animation while AJAX request is pending.
    $loader.fadeIn();

    // Retrieve all available games when the page loads.
    
	$.getScript(api_url + '?action=all_games&callback=NESGames.display_games', function(){
		$loader.fadeOut();
	});
})(window.jQuery);

//http://iam.colum.edu/students/adlyn.morrison/ASWM/week%206/cw_nes_games_json/index.html