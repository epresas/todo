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
  },
  
  changeTodo: function(position,todoText){
    this.todos[position].todoText = todoText;
    this.displayTodo();
  },
  
  deleteTodo: function (position){
    this.todos.splice(position,1);
    this.displayTodo();
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
    var todoInput= document.getElementById('todoTextInput');
    todoList.addTodo(todoInput.value);
    todoInput.value="";
  },
  toggleAll:function(){
    todoList.toggleAll();
  }
};

var view = {
  
  displayTodo: function(){
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML = '';
    for (i=0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      todoUl.appendChild(todoLi);
    }
  }

};
