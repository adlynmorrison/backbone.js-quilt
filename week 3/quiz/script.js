;(function() {

	//reference button
	var pass_ball = document.querySelector('#pass-ball');

	pass_ball.addEventListener('click', function(e){
		console.log(e);
		//toggle the 'active' class on ball
		ball.classList.toggle('active');
	});
})();