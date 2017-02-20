
$('#todoTextInput').focus();
var todoList = {
	todos: [],
  	displayTodo: function(){
    if(this.todos.length === 0){
      console.log('The list is empty');
    } 
    else {
      console.log('My Todos');
      for(var i = 0; i < this.todos.length;i++){
      
        if(this.todos[i].completed === true){
          console.log('(x)',this.todos[i].todoText);
        }
        else {
          console.log('( )',this.todos[i].todoText);
        }
      }
    }
  },
  
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodo();
    $('#todoTextInput').focus();
  },
  
  changeTodo: function(position,todoText){
    this.todos[position].todoText = todoText;
    this.displayTodo();
    $('#todoTextInput').focus();
  },
  
  deleteTodo: function (position){
    this.todos.splice(position,1);
    this.displayTodo();
    $('#todoTextInput').focus();
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodo();
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
    this.displayTodo();
  }

};

var handlers={
  displayTodo: function(){
    todoList.displayTodo();
  },
  addTodo: function(){
    var todoInput= $('#todoTextInput').val();
    todoList.addTodo(todoInput);
    $('#todoTextInput').val("");
  },
  toggleAll:function(){
    todoList.toggleAll();
  }
};

var view = {
  
  displayTodo: function(){
    var todoUl = $("ul");
    $(todoUl).empty();
    for (i=0; i < todoList.todos.length; i++){
      var todoLi = todoList.todos[i].todoText;
      // console.log(todoLi);
      $(todoUl).append('<li><div class="completedCheck"></div><span class="todoLiText">'+todoLi+'</span><button class="btnRemoveTodo">X</button></li>');
    }
  }
};

$("#todoTextInput").keypress(function( event ) {
	if ( event.which == 13 ) {
	     handlers.addTodo();
	     view.displayTodo();
	}
});

$('#addTodoBtn').click(function(){
	handlers.addTodo();
	view.displayTodo();
});
$('.btnRemoveTodo').click( function(){
	var li = $(this).index();
	

	// var todoIndex = todoList.todos.indexOf(this);
	console.log(li);
	// todoList.deleteTodo(todoIndex);
	// view.displayTodo();
});

