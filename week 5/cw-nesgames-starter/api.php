<?php
require('data.php');

$return = array(
	'error' => 'No action specified'
);

$action = (array_key_exists('action', $_REQUEST)) ? $_REQUEST['action'] : '';

switch ($action) :
	case 'all_games':
		$return['games'] = $games;
		$return['error'] = '';

		break;
	case 'related_games':
		$publisher = (array_key_exists('publisher', $_REQUEST)) ? $_REQUEST['publisher'] : '';
		$game_id = (array_key_exists('id', $_REQUEST)) ? $_REQUEST['id'] : '';

		$return['games'] = get_games_by_publisher($publisher, $game_id);
		$return['error'] = '';

		break;
	case 'game':
		$game_id = (array_key_exists('id', $_REQUEST)) ? $_REQUEST['id'] : '';

		$game = get_game_by_id($game_id);

		if ($game) :
			$return['games'] = array($game);
			$return['error'] = '';
		else :
			$return['error'] = 'Game not found!';
		endif;

		break;
endswitch;

// fake DB lookup time
sleep(1);

echo json_encode($return);

exit();
?>
