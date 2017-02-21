
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
  addTodo: function(){
    var todoInput= $('#todoTextInput').val();
    if (todoInput === "") {
      alert('Text field cannot be empty!');
    } else {
    todoList.addTodo(todoInput);
    $('#todoTextInput').val("");
    view.displayTodo();
    }
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
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
      $(todoLi).html('<span class="todoLiText">'+todo.todoText+'</span>');
      if(todo.completed === true){
        $(todoLi).addClass('imgCheckedTrue');
      } else {
        $(todoLi).addClass('imgCheckedFalse');
      }
      $(todoLi).append(this.addDeleteBtn());
      $(todoUl).append(todoLi);
    }, this); //this hace referencia al this del objeto, y se añade para que la instruccion this dentro de la funcion callback llame al objeto tambien.
    
  },
  addDeleteBtn: function(){
    var deleteBtn = document.createElement('button');
    $(deleteBtn).addClass("deleteBtn").text('X');
    return deleteBtn;
  }
};

//################# END - OBJECTS ##################################################

  var todoUl = document.querySelector('ul');
  todoUl.addEventListener("click", function(event){
    var clickedElement = event.target;
    if(clickedElement.className === 'deleteBtn'){
      handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
    }
  });

  $("#todoTextInput").keypress(function(event) {
  	if (event.which == 13) {
  	     handlers.addTodo();  
  	}
  });



