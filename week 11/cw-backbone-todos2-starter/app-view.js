//set up our namespace
var TodoApp = window.TodoApp || {};

//create a new application view 
TodoApp.AppView = Backbone.View.extend ({
	//boundries of our application - it will
	//operate inside the element specified below
	el: $('#todo-app'),
	
	//set up our event handlers
	events: {
		'click #create-todo' : 'create_todo'
	},
	
	//automatically called when the app view is
	//instantiated
	initialize: function() { 
		//reference the todo list
		this.$todo_list = $('#todo-list');
	
		// get a reference to our form elements
		this.$form = $('#todo-form');
		this.$title = $('#title');	
		this.$due = $('#due');
		this.$notes = $('#notes');
		this.$important = $('#important');
		
		// get a reference to our stats elements
		this.$count_total = $('#count-total');
		this.$count_complete = $('#count-complete');
		this.$count_important = $('#count-important');
		
		//make this application view listen for todos
		//added to our collection
		this.listenTo(TodoApp.Todos, 'add', this.add_todo);
		
		// listen for *ANY* change on the collection
		// and run the 'render_stats' function
		this.listenTo(TodoApp.Todos, 'all', this.render_stats);
		
		// get all existing todos saved in localStorage
		// this 'fetch' call will work with localStorage
		// as well as URLS/APIs
		TodoApp.Todos.fetch();
	},
	
	// update the important from complete and total counts 
	// at the top of the todo list
	render_stats: function(){
		// get the total number of todos
		var total = TodoApp.Todos.length;
		
		//get the total number of completed todos
		var completed = TodoApp.Todos.complete().length;
		
		//get the total number of important todos
		var important = TodoApp.Todos.important().length;
		
		//update the display
		this.$count_total.text(total);
		this.$count_complete.text(completed);
		this.$count_important.text(important);
	},
	
	add_todo: function(todo){
		//create and instance of the view
		var view = new TodoApp.TodoView({ model: todo });
		
		this.$todo_list.append(view.render().el);
	},
	
		//handle clicks on #create-todo
		create_todo: function(e) {
			//reference the todo list
			
			e.preventDefault();
			
			var todo_values = {
				title: this.$tile.val(),
				notes: this.$notes.val(),
				due: this.$due.val(),
				important: this.$important.is(':checked')
			};
			
			// add this new todo to our collection
			TodoApp.Todos.create(todo_values);
			
			console.log(TodoApp.Todos);
			
			//reset the form
			this.$form[0].reset();
		}
});

//create an instance of our application view
//this instance acts as the ignition switch
//of our application
window.TodoAppView = new TodoApp.AppView();