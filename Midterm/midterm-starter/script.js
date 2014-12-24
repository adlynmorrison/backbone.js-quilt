;(function($) {
    var $sidebar_review_list = $("#sidebar-review-list");
    var $review_form = $("#review-form");
    var $name = $("a");
    var $email = $("href");
    var $review = $("p");
	
	//get a reference to the submit buttons
  	var $submit_review = $('#submit-review');

	var $sidebar_review_list = $('#sidebar-review-list');
	
	//function that will create the reviews
	var submit_review = function() {
		var $li = $('<li>');
		var $p = $('<p>');
		var $a = $('<a>');

		//set the value
		$p.text($review);
		$a.text($name);
		$a.attr('href', $email);
		
		$li.append($p);
		$li.append($a);
		
		$sidebar_review_list.append($li);
	};

	// add an event listener on the click event of the submit button
  	$('#submit-review').on('click', function(e) {
		e.preventDefault();
		
		submit_review();
	});
})(window.jQuery);