let todos = [];

function renderTodos() {
  const todoListNode = document.getElementById("todoList");
  todoListNode.innerHTML = "";
  todos.forEach((todo) => {
    const { id, label, isDone } = todo || {};

    const todoItemNode = document.createElement("li");
    todoItemNode.className = `todo-item ${isDone ? "done" : ""}`;
    todoItemNode.id = id;

    const labelNode = document.createElement("span");
    labelNode.className = "todo-label";
    labelNode.innerText = label;

    const actionNode = document.createElement("div");
    actionNode.className = "todo-action";

    const deleteBtnNode = document.createElement("button");
    deleteBtnNode.className = "btn btn-delete";
    deleteBtnNode.innerText = "Delete";
    deleteBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodo(id);
    });

    const doneBtnNode = document.createElement("button");
    doneBtnNode.className = "btn btn-done";
    doneBtnNode.innerText = isDone ? "Undone" : "Done";
    doneBtnNode.addEventListener("click", (event) => {
      event.preventDefault();
      updateTodoStatus(id);
    });

    actionNode.appendChild(deleteBtnNode);
    actionNode.appendChild(doneBtnNode);

    todoItemNode.appendChild(labelNode);
    todoItemNode.appendChild(actionNode);

    todoListNode.appendChild(todoItemNode);
  });
}

const addInputNode = document.getElementById("addInput");
const addFormNode = document.getElementById("addForm");
addFormNode.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  const newTodo = {
    id: Date.now(),
    label: addInputNode.value,
    isDone: false,
  };
  todos.push(newTodo);
  renderTodos();
  addInputNode.value = "";
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function updateTodoStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );
  renderTodos();
}
