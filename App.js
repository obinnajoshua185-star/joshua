const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = ""; // clear input
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = ""; // clear list

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.cursor = "pointer";

    // Toggle complete on click
    span.addEventListener("click", () => toggleTask(task.id));

     /**
     * Edits a specific task.
     * @param {HTMLLIElement} listItem The list item element to edit.
     */
    function editTask(listItem) {
        const taskSpan = listItem.querySelector('span');
        const originalText = taskSpan.textContent;
        const newText = prompt('Edit your task:', originalText);

        if (newText !== null && newText.trim() !== '') {
            taskSpan.textContent = newText.trim();
            saveTasks();
        }
    }


    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}


// Toggle Complete
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}