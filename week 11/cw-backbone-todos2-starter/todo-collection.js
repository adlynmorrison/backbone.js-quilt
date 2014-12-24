// set up our namespace
var TodoApp = window.TodoApp ||{};

// create a collection to hold all the todos
TodoApp.TodoCollection = Backbone.Collection.extend({
	// tell the collection what model to use
	model: TodoApp.TodoModel,
	
	// specify local storage instead of a URL
	localStorage: new Backbone.LocalStorage('todo-app'),
	
	// function to return only completed todos
	complete: function(){
		//filter is the underscore message it gives you
		return this.filter(function(todo) {
			// if the todo is complete, add it to
			// the return array
			return todo.get('complete');
		});
	},
	
	important: function(){
		//filter is the underscore message it gives you
		return this.filter(function(todo) {
			// if the todo is complete, add it to
			// the return array
			return todo.get('important');
		});
	}
});

// create an instance of our collection
TodoApp.Todos = new TodoApp.TodoCollection();