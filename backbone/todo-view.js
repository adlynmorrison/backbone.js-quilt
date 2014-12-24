var TodoApp = window.TodoApp || {};

TodoApp.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo',
    template: _.template($('#todo-template').html()),

    events: {
        'click .delete': 'delete_todo',
        'click .complete': 'complete_todo'
    },

    delete_todo: function(e) {
        e.preventDefault();

        if (this.model.get('complete') || confirm('Are you sure you want to delete this todo item?')) {
            // Removes the model from local storage AND from the collection.
            this.model.destroy();

            this.$el.slideUp('fast', function() {
                // Removes the model's HTML from the page.
                this.remove();
            });
        }
    },

    complete_todo: function(e) {
        e.preventDefault();

        this.model.set('complete', true);

        // Save the model to local storage (so when we refresh, it's still marked as complete).
        this.model.save();

        this.$el.addClass('completed');
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        if (this.model.get('important')) {
            this.$el.addClass('important');
        }

        return this;
    }
});
