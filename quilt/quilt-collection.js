//set up our namespace
var TileApp = window.TileApp || {};

//create a collection to hold all the tiles
TileApp.TileCollection = Backbone.Collection.extend({
	//tell the collection what model to use
	model: TileApp.TileModel,
	
	//specify local storage insteal of a URL
	localStorage: new Backbone.LocalStorage('tile-app'),
	
	//use the 'order' attribute on the model to 
	//sort the collection
	comparator: 'order',
	
	// function to return only completed tiles
	featured: function(){
		//filter is the underscore message it gives
		return this.filter(function(tile){
			// if the tile is featured, add it to
			// the return array
			return tile.get('featured');
		});
	},
	
	//function to return only completed tiles
	expanded: function(){
		//filter is the underscore message it gives you
		return this.filter(function(tile) {
			//if the tile is 'expanded, add it to
			// the return array
			return tile.get('expanded');
		});
	}
	
});

TileApp.Tiles = new TileApp.TileCollection();