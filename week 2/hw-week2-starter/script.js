;(function() {
  'use strict';

//give reference to the mountain-image
	var mountain_image = document.querySelector('#mountain-image');
	var marge_image = document.querySelector('#marge-image');
	var plow_image = document.querySelector('#plow-image');

	mountain_image.addEventListener('click', function(e){
		console.log(e);
		var mountain = document.querySelector('#mountain');
		//toggle the 'image' class on product
		mountain.classList.toggle('episode-open');
	});

	marge_image.addEventListener('click', function(e){
		console.log(e);
		var marge = document.querySelector('#marge');
		//toggle the 'image' class on product
		marge.classList.toggle('episode-open');
	});

	plow_image.addEventListener('click', function(e){
		console.log(e);
		var plow = document.querySelector('#plow');
		//toggle the 'image' class on product
		plow.classList.toggle('episode-open');		
	});
})();