//wrapper
;function(){
	'use scrict';

	//reference buttons
	var ball_button = document.querySelector('#ball-button');
	var burger_button = document.querySelector('#burger-button');
	var doge_button = document.querySelector('#doge-button');
	var peaches_button = document.querySelector('#peaches-button');
	var hat_button = document.querySelector('#hat-button');


	ball_button.addEventListener('click', function(e){
		console.log(e);
		ball.classList.toggle('active');
	});

	burger_button.addEventListener('click', function(e){
		console.log(e);
		burger.classList.toggle('active');
	});

	doge_button.addEventListener('click', function(e){
		console.log(e);
		doge.classList.toggle('active');
	});

	peaches_button.addEventListener('click', function(e){
		console.log(e);
		peaches.classList.toggle('active');
	});

	hat_button.addEventListener('click', function(e){
		console.log(e);
		hat.classList.toggle('active');
	});
})();