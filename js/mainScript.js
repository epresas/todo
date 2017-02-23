
$(document).ready(function(){
  $('#todoTextInput').focus();
});
//################# OBJECTS ##################################################
var todoList = {
	todos: [],
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    $('#todoTextInput').focus();
  },
  
  changeTodo: function(position,todoText){
    this.todos[position].todoText = todoText;
    $('#todoTextInput').focus();
  },
  
  deleteTodo: function (position){
    this.todos.splice(position,1);
    $('#todoTextInput').focus();
    view.displayTodo();
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var totalCompleted = 0;

    this.todos.forEach( function (todo) {
      if (todo.completed === true) {
        totalCompleted++;
      }
    });

    this.todos.forEach(function(todo) {
      if(totalTodos === totalCompleted){
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers={
  addTodo: function(event){
    var todoInput= $('#todoTextInput').val();
    if (event.which == 13) {
      
      if (todoInput === "") {
        alert('Text field cannot be empty!');
      } else {
      todoList.addTodo(todoInput);
      $('#todoTextInput').val("");
      view.displayTodo();
      }
    }
  },
  addTodoClick: function(){
    var todoInput= $('#todoTextInput').val();
    if (todoInput === "") {
      alert('Text field cannot be empty!');
    } else {
    todoList.addTodo(todoInput);
    $('#todoTextInput').val("");
    view.displayTodo();
    }
  },
  changeTodo: function(position,todoText){

  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodo();
  },
  toggleCompleted: function(position){
    todoList.toggleCompleted(position);
    view.displayTodo();
  },
  toggleAll:function(){
    todoList.toggleAll();
   	view.displayTodo();
  }
};

var view = {
  
  displayTodo: function(){
    var todoUl = $("ul");
    $(todoUl).empty();
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.id = position;
      $(todoLi).html('<span class="glyphicon glyphicon-unchecked"></span><span class="todoLiText">'+ todo.todoText +'</span>');
      if(todo.completed === true){
        $(todoLi).html('<span class="glyphicon glyphicon-check"></span><span class="todoLiText">'+ todo.todoText +'</span>');
      } 
      $(todoLi).append(this.addDeleteBtn());
      $(todoLi).append(this.addEditBtn());
      $(todoUl).append(todoLi);
    }, this); //this hace referencia al this del objeto, y se añade para que la instruccion this dentro de la funcion callback llame al objeto tambien.
    
  },
  addDeleteBtn: function(){
    var deleteBtn = document.createElement('button');
    $(deleteBtn).addClass("deleteBtn").html('<span class="glyphicon glyphicon-trash"></span>');
    return deleteBtn;
  },
  addEditBtn: function(){
    var editBtn = document.createElement('button');
    $(editBtn).addClass("editBtn").html('<span class="glyphicon glyphicon-edit"></span>');
    return editBtn;  
  }
};

//################# END OBJECTS ##################################################

  var todoUl = document.querySelector('ul');
  todoUl.addEventListener("click", function(event){
    var clickedElement = event.target;

    switch (clickedElement.className){
      case "deleteBtn":
        handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
        break;
      case "editBtn":
        handlers.changeTodo(parseInt(clickedElement.parentNode.id),/*funcion que edite el texto*/);
        break;
      case "glyphicon glyphicon-trash":
        handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
        break;
      case "glyphicon glyphicon-unchecked":
        handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
        var classText = $('.todoLiText');
        classText.addClass('todoTextCompleted');
        
        break;
      case "glyphicon glyphicon-check":
        handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
        var text= document.getElementById('todoLiText');
        text.className -= 'todoTextCompleted';

        break;
    }
  });

  // $("#todoTextInput").keypress(function(event) {
  // 	if (event.which == 13) {
  //     if($("#todoTextInput").val() === ""){
  //       alert('Text field cannot be empty!');  
  //     } else {
  // 	     handlers.addTodo();  
  //       } 
  // 	}
  // });



