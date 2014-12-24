//make a reference toward our namespace
var Heartbleed = window.Heartbleed || {};

//create a Backbone model
Heartbleed.VideoGame = Backbone.Model.extend({
	//must be defaults
	defaults: {
		title: 'Coming Soon...',
		publisher: '',
		release_year:'',
		box_art: 'placeholder.jpg',
		platforms: [],
		description: ''
	}
});