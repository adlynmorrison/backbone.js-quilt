;(function($){
	'use scrict'
	
	$('.setup').click(function(){
		$( '.punchline').slideDown('slow', function() {
    	$('.actions').slideDown('slow');
  		});
	});
	
	$('.button-funny').on('click', function() {
		event.preventDefault();
		
		var $parent = $(this).closest('.joke');
		$parent.addClass('joke-funny');
		
		var $actions = $(this).closest('.actions');
		$actions.slideUp('slow', function(){
			$actions.remove();
		});
	});
	
	$('.button-lame').on('click', function() {
		event.preventDefault();
		
		var $parent = $(this).closest('.joke');
		$parent.addClass('joke-lame');
		
		var $actions = $(this).closest('.actions');
		$actions.slideUp('slow', function(){
			$actions.remove();
		});
		
	});
		
})(window.jQuery);