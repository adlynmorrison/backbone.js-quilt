//set up our namespace
var TileApp = window.TileApp || {};

TileApp.TileModel = Backbone.Model.extend({
    defaults: {
        title: 'Title',
		source: '',
		caption: '',
		featured: false,
		order: 0
    }
});
