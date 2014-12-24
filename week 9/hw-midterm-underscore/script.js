;(function($) {
    'use strict';

    // reference the 'load more donuts' button
    var $load_more_donuts = $('#load-more-donuts');

    // reference where to put more donuts
    var $more_donuts = $('#more-donuts');

    // reference product display area
    var $products_container = $('#all-products');

    // reference review list
    var $review_list = $('#sidebar-review-list');

    // reference form elements
    var $form_review = $('#review-form');
    var $input_name = $('#name');
    var $input_email = $('#email');
    var $input_review = $('#review');

    // reference cart item count element
    var $cart_item_count = $('#cart-item-count');

    // reference to cart items list
    var $cart_items = $('#cart-items');

    // Function to display more donuts. Called after AJAX request
    // completes.
    var display_donuts = function(data) {
        // set up variables we need in the for loop below
        var $li, $a, $figure, $img, $figcaption;

        for (var i = 0; i < data.donuts.length; i++) {
            //reference our template
			var product_item_template = _.template($('#product-item-template').html());
	
			//create an object with values for the template tokens
			var donut_data = {
				name: data.donuts[i].name,
				id: data.donuts[i].id,
				image: data.donut[i].image,
				caption: data.donut[i].caption
			};

			/*// create a new <li>
            $li = $('<li>');

            // give it the correct class
            $li.addClass('product-item');

            // create a new <a>
            $a = $('<a>');

            // give it the correct class and an href attribute
            $a.addClass('product').attr('href', '#');

            // give it data attributes for the cart
            $a.data('donut-id', data.donuts[i].id);
            $a.data('donut-name', data.donuts[i].name);

            // create a new <figure>
            $figure = $('<figure>');

            // give it the correct class
            $figure.addClass('product-image');

            // create a new image
            $img = $('<img>');

            // set the source
            $img.attr('src', data.donuts[i].image);

            // create a new <figcaption>
            $figcaption = $('<figcaption>');

            // give it the correct class
            $figcaption.addClass('product-caption');

            // add text to the <figcaption>
            $figcaption.text(data.donuts[i].name);

            // put the pieces together - ORDER MATTERS!

            // <img> goes inside the <figure> first
            $figure.append($img);

            // <figcaption goes inside the <figure> second
            $figure.append($figcaption);

            // <figure> goes inside the <a>
            $a.append($figure);

            // <a> goes inside the <li>
            $li.append($a);

            // <li> goes inside the donut list
            $more_donuts.append($li);*/
        }

        // slide down the more donuts list
        $more_donuts.slideDown();

        // get rid of the load more donuts button, then remove it
        $load_more_donuts.fadeOut('normal', function() {
            $load_more_donuts.remove();
        });
    };

    // event listener for 'load more donuts' button
    $load_more_donuts.on('click', function() {
        // add hidden class for dramatic slide down later
        $more_donuts.addClass('hidden');

        // make ajax request to our local API
        $.ajax({
            url: 'api.php?action=more_donuts',
            type: 'get',
            dataType: 'json',
            success: function(data, status, xhr) {
                // when AJAX succeeds, call our 'display_donuts' function, passing
                // in the data returned from the API
                display_donuts(data);
            }
        });
    });

    $products_container.on('click', '.product', function(e) {
        e.preventDefault();

        // variable to hold $(this) (for performance reasons)
        var $this = $(this);

        // toggle the selected class
        $this.toggleClass('product-selected');

        // update the number of items in cart
        $cart_item_count.text($('.product-selected').length);

        // if this product is selected, make sure it's shown in the cart
        if ($this.hasClass('product-selected')) {
            // do we have a <li> in the cart with an id containing the clicked donut's data-donut value?
            // if not, create a new <li> and add it to the cart items.
            if ($('#cart-item-' + $this.data('donut-id')).length === 0) {
                // create new <li>
                var $li = $('<li>');

                // set the id so we can check for/remove it later
                $li.attr('id', 'cart-item-' + $this.data('donut-id'));

                // add a hidden class to the <li> for sliding down later
                $li.addClass('hidden');

                // set the text equal to the caption of the clicked product
                $li.text($this.data('donut-name'));

                // append the <li> to the cart items
                $cart_items.append($li);

                // slide the <li> into view
                $li.slideDown();
            }
        // otherwise, make sure it's *not* shown in the cart
        } else {
            // slide up the <li> with the proper id, and then remove it
            $('#cart-item-' + $this.data('donut-id')).slideUp('fast', function() {
                $(this).remove();
            });
        }
    });
	
	//reference to our template
	var review_template = _.template($('#review-template').html());
	
    $form_review.on('submit', function(e) {
        e.preventDefault();
		/*
        // make sure all fields are filled in
        if ($input_review.val() !== '' && $input_email.val() !== '' && $input_name.val() !== '') {
            // create a new <li>
            var $li = $('<li>');

            // add the appropriate classes (hidden for fancy slide in later)
            $li.addClass('review hidden');

            // create a new <p> to hold the review text
            var $p = $('<p>');

            // add the review text to the <p>
            $p.text($input_review.val());

            // create a new <a> for the reviewer's name/link
            var $a = $('<a>');

            // add a mailto link for the author's email
            $a.attr('href', 'mailto:' + $input_email.val());

            // add the author's name to the <a>
            $a.text($input_name.val());

            // append the <p> to the <li>
            $li.append($p);

            // append the <a> to the <li>
            $li.append($a);

            // prepend the new review to the review list
            $review_list.prepend($li);

            // slide down the new review (fancy!)
            $li.slideDown();

            // reset/clear out the form fields
            $input_name.val('');
            $input_email.val('');
            $input_review.val('');
        }*/
		
		//get a reference to the form elements
		var _$form_review = $('#review-form');
		var _$input_name = $('#name');
		var _$input_email = $('#email');
		var _$input_review = $('#review');
		
		//variable to hold form values when sumbmit is clicked
		var review_values;
		
		//variable to hold form markup generated by the template
		var review_markup;
		
		//reference to hold all todos
		var review_list = $('#review-list');
			e.preventDefault();
			
			review_values = {
				name: _$input_name.val(),
				email: _$input_email.val(),
				review: _$input_review.val()
			};
		
		//create markup using our template
		review_markup = review_template(review_values);
		
		//append 
		_$review_list.append(review_markup);
		
		//reset the form
		_$form_review[0].reset();
    });
})(window.jQuery);
