
$('#todoTextInput').focus();
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
	}
});


$('.btnRemoveTodo').click( function(){
	var li = $(this).index();
	

	// var todoIndex = todoList.todos.indexOf(this);
	console.log(li);
	// todoList.deleteTodo(todoIndex);
	// view.displayTodo();
});

