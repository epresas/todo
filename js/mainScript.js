
$('#todoTextInput').focus();
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
    for(i=0;i< totalTodos;i++){
      if(this.todos[i].completed === true){
        totalCompleted++;
      }
    }
    if(totalTodos === totalCompleted){
      for(i=0;i<totalTodos;i++){
        this.todos[i].completed=false;
      }
    }
    else {
      for(i=0;i<totalTodos;i++){
        this.todos[i].completed=true;
      }
       
    }
  }

};

var handlers={
  addTodo: function(){
    var todoInput= $('#todoTextInput').val();
    todoList.addTodo(todoInput);
    $('#todoTextInput').val("");
    view.displayTodo();
  },
  toggleAll:function(){
    todoList.toggleAll();
   	view.displayTodo();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodo();
  }
};

var view = {
  
  displayTodo: function(){
    var todoUl = $("ul");
    $(todoUl).empty();
    for (i=0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      todoLi.id = i;
      $(todoLi).text(todoList.todos[i].todoText);
      $(todoLi).append(this.addDeleteBtn());
      
      $(todoUl).append(todoLi);

    }
  },
  addDeleteBtn: function(){
    var deleteBtn = document.createElement('button');
    $(deleteBtn).addClass("deleteBtn").text('X');
    return deleteBtn;
  }
};

//################# OBJECTS ##################################################

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



