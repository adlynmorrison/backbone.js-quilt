// JavaScript Document
//reference our namespace (naming the sandbox)
var TodoApp = window.TodoApp || {};

;(function($){
	'use strict'
	
	//reference to the todo list
	var $todo_list = $('#todo-list');
	
	//reference all the form fields
	var $todo_form = $('#todo-form');
	var $title = $('#title');
	var $notes = $('#notes');
	var $important = $('#important');
	var $due = $('#due');
	
	//variable to hold model seed data
	var todo_data;
	
	//variable to hold an instance of our TodoModel
	var todo;
	
	var todo_view;
	
	//variable to hold new markup generated by TodoView
	var todo_html;
	
	//event handler to the button
	$('#create-todo').on('click', function(e){
		e.preventDefault();
		
		//build our todo_data object literal
		//using values from the form
		todo_data = {
			title: $title.val(),
			notes: $notes.val(),
			due: $due.val(),
			important: $important.is(':checked')
		};
		
		//BACKBONE!
		//create a new instance of a new model
		todo = new TodoApp.TodoModel(todo_data);
		
		//create instance of our view
		todo_view = new TodoApp.TodoView({ model: todo});
		
		//get the html out of our view
		todo_html = todo_view.render().el;
		
		$todo_list.append(todo_html);
		
		//reset the form
		$todo_form[0].reset();
	});
})(window.jQuery);