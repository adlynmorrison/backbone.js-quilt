//set up our namespace
var TileApp = window.TileApp || {};

TileApp.TileView = Backbone.View.extend({
	//make a li tag
	tagName: 'li',
	//make a tile class
	className: 'tile',
	//this is where the html is coming from
	template:  _.template($('#tile-template').html()),
	
	//define the events
	events:{
		'click .feature': 'feature_tile',
		'click .view': 'view_tile',
		'click .delete': 'delete_tile'
	},
	
	//add the feature class to the tile
	feature_tile: function(e){
		e.preventDefault();
		//remove feature class from this element
		if (this.model.get('featured')){
			this.$el.removeClass('featured');
			this.model.set('featured', false);
		}
		else{
		//add featured class to this element
			this.$el.addClass('featured');
			this.model.set('featured', true);
		}
		this.model.save();
	},
	
	//add the expanded class to the tile
	view_tile: function(e){
		e.preventDefault();
		
		//remove class from this element
		if (this.model.get('expanded')){
			this.$el.removeClass('expanded');
			this.model.set('expanded', false);
		}
		else{
			//add expanded class to this element
			this.$el.addClass('expanded');
			this.model.set('expanded', true);
		}
		this.model.save();
	},
	
	//add the delete class to the tile
	delete_tile: function(e) {
		e.preventDefault();
		
		if (this.model.get('delete') || confirm('Are you sure you want to delete this title?')) {
			this.model.destroy();
			
			this.$el.slideUp('fast', function() {
				this.remove();
			});
		}
	},
	
	//render the tile
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		//add feature class if star button is clicked
		if (this.model.get('featured')){
			this.$el.addClass('featured');
		}
		
		//add expanded class if expanded button is clicked
		if (this.model.get('expanded')){
			this.$el.addClass('expanded');
		}
		
		return this
	}
	
});