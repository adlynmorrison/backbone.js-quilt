var TodoApp = window.TodoApp || {};

// create a new collection
TodoApp.TodoCollection = Backbone.Collection.extend({
    // specify the model that this collection will hold
    model: TodoApp.TodoModel,

    localStorage: new Backbone.LocalStorage('todo-app'),

    // Function to return an array containing only complete todos.
    complete: function() {
        // filter is an Underscore helper method that looks at each todo in the collection.
        return this.filter(function(todo) {
            // If the todo is complete, it will be added to the new array.
            return todo.get('complete');
        });
    }
});

// Create an instance of our collection, stored in our namespace. We'll use
// this collection inside of app-view.js.
TodoApp.Todos = new TodoApp.TodoCollection();
