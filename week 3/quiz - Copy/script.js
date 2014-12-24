;(function($) {
	'use strict';
	
	//reference button
	var $pass_ball = $('#pass-ball');
	var $ball = $('#ball');

	$pass_ball.on('click', function(e){
		$ball.toggleClass('active');
	});
})(window.jQuery);