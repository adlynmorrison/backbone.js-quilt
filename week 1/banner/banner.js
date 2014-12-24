;(function() {
	'use strict';
	
	// get a reference to the make banners button
	var create_button = document.querySelector('#create-banners');
	
	//get references to all the form fields
	var f_text = document.querySelector('#text');
	var f_text_size = document.querySelector('#text-size');
	var f_text_color = document.querySelector('#text-color');
	var f_bg_color = document.querySelector('#bg-color');
	var f_banner_count = document.querySelector('#banner-count');
	
	//give reference to the banner display area
	var banner_display = document.querySelector('#banner-display');
	
	//add an event listener to the button
	create_button.addEventListener('click', function(e) {
		e.preventDefault();
		
		//create an object that holds all the banner properties
		var banner_props = {};
		
		//get all the values from the form fields 
		//and putt them in our object
		banner_props.text = f_text.value;
		banner_props.text_size = f_text_size.value;
		banner_props.text_color = f_text_color.value;
		banner_props.bg_color = f_bg_color.value;
		banner_props.count = f_banner_count.value;
		
		create_banner(banner_props);
	});
	
	// get a referene for the clear banner button
	var clear_banners = document.querySelector('#clear-banners');
	
	//add an event listener to the button
	clear_banners.addEventListener('click', function(e) {
		clear_banners();		
	});
	
	var clear_banners = function(){
		//Remove any existing banners
		while (banner_display.hasChildNodes()) {
			banner_display.removeChild(banner_display.lastChild);
		}
	};
	
	//props are paramiter or an argument
	var create_banner = function(props) {
		var banner;
		var text;
		
		for (var i = 0; i < props.count; i++) {		
			//create the banner
			banner = document.createElement('div');
			
			//Set the background and text color
			banner.setAttribute('style', 
				'background:' + props.bg_color + '; color:' + props.text_color + ';');
			
			//set the class of the banner
			banner.setAttribute('class', 'banner banner-' + props.text_size);
			
			//add the text node to the banner
			text = document.createTextNode(props.text);
		
			//
			banner.appendChild(text);
			
			//add the banner to the page
			banner_display.appendChild(banner);
		}
	};
	
	banner_display.addEventListener('click', function(e){
		console.log(e);
		if (e.target.classList.contains('banner')){
			if(e.target.classList.contains ('marked')) {
				//remove banner
				banner_display.removeChild(e.target);
			} else {
				//add the marked class to the banner
				e.target.classList.add('marked');
			}
		}
	});
})();