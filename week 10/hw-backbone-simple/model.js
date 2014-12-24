// JavaScript Document
//reference our namespace (naming the sandbox)
var TodoApp = window.TodoApp || {};

//create ToDo model
TodoApp.TodoModel = Backbone.Model.extend({
	defaults: {
		titles: 'Do Something',
		notes: '',
		important: false,
		complete: false
	}
});