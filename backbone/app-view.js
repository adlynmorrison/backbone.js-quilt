var TodoApp = window.TodoApp || {};

TodoApp.AppView = Backbone.View.extend({
    // The wrapping element for our entire app. In this case, it's the <main> element, but
    // you can have a Backbone 'app' be just a small part of your overall website.
    el: $('#todo-app'),

    // Event listeners for elements inside the TodoApp.AppView's el.
    events: {
        'click #create-todo': 'create_todo'
    },

    // This function is called as soon as we instantiate the TodoApp.AppView. Basically,
    // this function is the first thing that executes in our app.
    initialize: function() {
        // Reference the list that holds all the todos.
        this.$todo_list = $('#todo-list');

        // Reference our form variables.
        this.$form = $('#todo-form');
        this.$title = $('#title');
        this.$notes = $('#notes');
        this.$due = $('#due');
        this.$important = $('#important');

        // Reference stats variables.
        this.$count_complete = $('#count-complete');
        this.$count_important = $('#count-important');
        this.$count_total = $('#count-total');

        // When a todo is added to the collection, make sure to render/display the HTML for the new todo.
        this.listenTo(TodoApp.Todos, 'add', this.add_one);

        // Any change to the TodoApp.Todos collection will trigger a re-rendering of the stats.
        this.listenTo(TodoApp.Todos, 'all', this.render);

        // Get any existing todos from localStorage.
        TodoApp.Todos.fetch();
    },

    add_one: function(todo) {
        // Create a new view for the given todo instance.
        var view = new TodoApp.TodoView({ model: todo });

        // Append the new HTML to the todo list.
        this.$todo_list.append(view.render().el);
    },

    // This function just updates the statistics - total, completed, and important counts.
    render: function() {
        // Store the number of completed & important todos.
        var complete = TodoApp.Todos.complete().length;

        // Update the counts.
        this.$count_complete.text(complete);
        this.$count_total.text(TodoApp.Todos.length);
    },

    // Creates a new todo instance based on values in the form.
    create_todo: function(e) {
        e.preventDefault();

        todo_values = {
            title: this.$title.val(),
            notes: this.$notes.val(),
            due: this.$due.val(),
            important: this.$important.is(':checked')
        };

        TodoApp.Todos.create(todo_values);

        this.$form[0].reset();
    }
});

// start the application
window.TodoAppView = new TodoApp.AppView();
