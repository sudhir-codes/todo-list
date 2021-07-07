// Selectors
const todoInput = document.querySelector(".form-input");
const todoButton = document.querySelector(".form-button");
const todoList = document.querySelector(".todoContainer-list");
const filterOption = document.querySelector(".form-filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // .preventDefault() - avoid reloading the page when button is pressed
  event.preventDefault();

  // Creating <div> tag - .todoContainer__todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoContainer-todo");

  // Creating <li> tag
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todoContainer-item");
  todoDiv.appendChild(newTodo);

  // Adding todo to local storage
  savelocalTodos(todoInput.value);

  // Creating <button> - Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("todoContainer-completedButton");
  todoDiv.appendChild(completedButton);

  // Creating <button> - Trash Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("todoContainer-deleteButton");
  todoDiv.appendChild(deleteButton);

  // Append to ToDo List
  todoList.appendChild(todoDiv);

  // Clear Input Value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  // Delete
  if (item.classList[0] === "todoContainer-deleteButton") {
    const todo = item.parentElement;
    // Animations
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // Wait till the animations get finished
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] == "todoContainer-completedButton") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function savelocalTodos(todo) {
  // Check Whether any todo alredy present there
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If there is no todo previously available, then it just creates an empty array
    todos = [];
  } else {
    // If there any todo already existing, we just get the already existing todo from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Just Saving the new todo
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Check Whether any todo alredy present there
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If there is no todo previously available, then it just creates an empty array
    todos = [];
  } else {
    // If there any todo already existing, we just get the already existing todo from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Creating <div> tag - .todoContainer__todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoContainer-todo");

    // Creating <li> tag
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todoContainer-item");
    todoDiv.appendChild(newTodo);

    // Creating <button> - Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("todoContainer-completedButton");
    todoDiv.appendChild(completedButton);

    // Creating <button> - Trash Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("todoContainer-deleteButton");
    todoDiv.appendChild(deleteButton);

    // Append to ToDo List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check Whether any todo alredy present there
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If there is no todo previously available, then it just creates an empty array
    todos = [];
  } else {
    // If there any todo already existing, we just get the already existing todo from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
