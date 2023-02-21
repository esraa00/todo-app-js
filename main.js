const userInput = document.querySelector(".form__input");
const submitButton = document.querySelector(".form__input-submit");
const tasksContainer = document.querySelector(".tasks");

//array to store tasks
let tasksArray = [];

if (getTasksFromLocalStorage()) {
  tasksArray = getTasksFromLocalStorage();
  addTasksToPage(tasksArray);
}

submitButton.onclick = function () {
  if (userInput.value !== "") {
    addTaskToArray(userInput.value); // add task to array of tasks
    userInput.value = ""; //empty input field
  }
};

function addTaskToArray(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };
  tasksArray.push(task);
  addTasksToPage(tasksArray);
  addTasksToLocalStorage(tasksArray);
}

function addTasksToPage(tasksArray) {
  tasksContainer.innerHTML = "";
  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) div.className = "done task";
    div.setAttribute("id", task.id);
    div.onclick = function (e) {
      div.classList.toggle("done");
      updateTaskInLocalStorage(div.getAttribute("id"));
    };
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "delete";
    span.onclick = function (e) {
      deleteTaskFromLocalStorage(span.parentElement.getAttribute("id"));
      span.parentElement.remove();
    };
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    tasksContainer.appendChild(div);
  });
}

function addTasksToLocalStorage(tasksArray) {
  if (!tasksArray) return;
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getTasksFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    return tasks;
  }
  return false;
}

function deleteTaskFromLocalStorage(id) {
  tasksArray = tasksArray.filter((task) => {
    return task.id != id;
  });
  addTasksToLocalStorage(tasksArray);
}

function updateTaskInLocalStorage(id) {
  const newTasks = tasksArray.map((task) => {
    if (task.id == id) {
      task.completed = !task.completed;
    }
    return task;
  });
  addTasksToLocalStorage(newTasks);
}
