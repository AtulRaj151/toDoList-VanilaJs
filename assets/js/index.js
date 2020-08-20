(function () {
  let inputText = document.getElementById("task-input");
  let addButton = document.getElementById("add-button");
  let taskList = document.getElementById("tasks");
  let taskCounter = document.getElementById("counter");
  let tasks = [];

  // task  = {
  //      id String
  //      text String
  //      done boolean
  // }

  //create new task and add to dom
  addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.innerHTML = `
       <input type="checkbox" id="${task.id}" class="task-checkbox" ${
      task.done ? "checked" : ""
    } />
       <label for="${task.id}">${task.text}</label>
       <i class="fas fa-calendar-times remove" data-id=${task.id} ></i>`;
    taskList.appendChild(li);
  };
  //udate the dom
  render = () => {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }

    taskCounter.innerHTML = "task left: " + tasks.length;
  };
  //make the task compelete
  markTaskAsComplete = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex > -1) {
      //task index found and update here
      tasks[taskIndex].done = !tasks[taskIndex].done; // toggle
      render(); // re render the task list to update in dom
      return;
    }
  };
  //delete task from list
  deleteTask = (taskId) => {
    // filter out the task
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    tasks = remainingTasks;
    render(); //update
  };

  //add task to list
  addTask = (task) => {
    if (task) {
      tasks.push(task);
      render();
    }
  };

  //complete all task
  completeAllTask = () => {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].done = true;
    }
    render();
  };

  //clear all the task which are compelete
  clearCompteletd = () => {
    const remainingTasks = tasks.filter((task) => task.done != true);
    tasks = remainingTasks;
    render();
  };

  //handle click listener
  handleClickListener = (e) => {
    if (e.target.classList.contains("remove")) {
      // remove task from dom
      deleteTask(e.target.dataset.id);
    } else if (e.target.className === "task-checkbox") {
      // make task compelete
      markTaskAsComplete(e.target.id);
    } else if (e.target.id === "add-button") {
      //add task dom when button is pressed
      let text = inputText.value;
      if (!text) {
        alert("task shouldnot be empty");
        return;
      }
      const task = {
        text,
        id: Date.now().toString(),
        done: false,
      };
      inputText.value = "";
      addTask(task);
    } else if (e.target.id === "complete-all-task") {
      //compltete all the task
      completeAllTask();
    } else if (e.target.id === "clear-compeleted") {
      //clear competed tasks
      clearCompteletd();
      render();
    }
  };

  //handle key listener
  handleKeyListener = (e) => {
    if (e.key === "Enter") {
      let text = e.target.value;
      if (!text) {
        alert("task shouldnot be empty");
        return;
      }
      const task = {
        text: text,
        id: Date.now().toString(),
        done: false,
      };
      e.target.value = "";
      addTask(task);
    }
  };
  init = () => {
    document.addEventListener("click", handleClickListener);
    document.addEventListener("keyup", handleKeyListener);
  };
  init();
})();
