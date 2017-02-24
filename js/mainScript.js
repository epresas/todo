
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
    todoList.changeTodo(position,todoText);
    view.displayTodo();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    if(todoList.todos.length === 0){
      $("#toggleAllBtn").css("visibility","hidden");  
    }
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
    var totalTodos = todoList.todos.length;
    if (totalTodos!=0){
      $("#toggleAllBtn").css("visibility","visible");
    }
    var todoUl = $("ul");
    $(todoUl).empty();
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.id = position;
      $(todoLi).html('<span class="glyphicon glyphicon-unchecked"></span><span class="todoLiText text-primary">'+ todo.todoText +'</span>');
      if(todo.completed === true){
        $(todoLi).html('<span class="glyphicon glyphicon-check"></span><span class="todoLiText todoTextCompleted text-success">'+ todo.todoText +'</span>');
      } 
      
      $(todoLi).append(this.addEditBtn());
      $(todoLi).append('<input class="textEditInput" placeholder="Insert new todo text"/><span class="glyphicon glyphicon-ok"></span>');
      $(todoLi).append(this.addDeleteBtn());
      $(todoUl).append(todoLi);
      // $("ul li:nth-child(even)").addClass("evenLi");
      // $("ul li:nth-child(odd) .todoLiText").addClass("oddLi");
      $("ul li").addClass("well well-sm");


    }, this); //this hace referencia al objeto, y se añade para que la instruccion this dentro de la funcion callback llame al objeto tambien.   
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

//################# EVENT LISTENERS ##############################################
  var todoUl = document.querySelector('ul');
  todoUl.addEventListener("click", function(event){
    var clickedElement = event.target;
    var clickedElementParentId=clickedElement.parentNode.id;
    var clickedElementParent=clickedElement.parentNode;

    switch (clickedElement.className){
      case "deleteBtn":
        handlers.deleteTodo(parseInt(clickedElementParentId));
        break;

      case "editBtn":
        // var btnClicked = clickedElement.parentNode.id;
        $(".deleteBtn").toggle("fast");
        $(clickedElementParent).find('.textEditInput').toggle("fast");
        $(clickedElementParent).find('.glyphicon-ok').toggle("fast");
        break;

      case "glyphicon glyphicon-edit":
        $(".deleteBtn").toggle("fast");
        $(clickedElementParent).siblings('.textEditInput').toggle("fast");
        $(clickedElementParent).siblings('.glyphicon-ok').toggle("fast");
        break;

      case "glyphicon glyphicon-trash":
        handlers.deleteTodo(parseInt(clickedElementParentId));
        break;

      case "glyphicon glyphicon-unchecked":
        handlers.toggleCompleted(parseInt(clickedElementParentId));
        break;

      case "glyphicon glyphicon-check":
        handlers.toggleCompleted(parseInt(clickedElementParentId));
        break;

      case "glyphicon glyphicon-ok":
        // console.log(clickedElementParentId);
        var newText= $(clickedElementParent).find('input').val();
        if(newText===""){
          alert("Text field cannot be empty!");
        } else {
          console.log(newText);
        handlers.changeTodo(parseInt(clickedElementParentId),newText);
        }
        
        break;
    }
  });