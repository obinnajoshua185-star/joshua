document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const textInput = document.getElementById('textInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Event listener for the "Add Task" button click
    addBtn.addEventListener('click', addTask);

    // Event listener for the Enter key press in the input field
    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for clicks on the task list (using event delegation)
    taskList.addEventListener('click', handleTaskActions);

    /**
     * Handles adding a new task to the list.
     */
    function addTask() {
        const taskText = textInput.value.trim();

        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasks();
            textInput.value = ''; // Clear the input field
            textInput.focus(); // Set focus back to the input
        }
    }

    /**
     * Creates and appends a new list item for a task.
     * @param {string} taskText The text content of the task.
     */
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    /**
     * Handles edit and delete actions on the task list using event delegation.
     * @param {*} event  {Event} event The click event object.
     */
    function handleTaskActions(event) {
        const target = event.target;
        const listItem = target.closest('li');

        if (!listItem) return; // Exit if the click wasn't on a list item or its children

        if (target.classList.contains('edit-btn')) {
            editTask(listItem);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(listItem);
        }
    }

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

    /**
     * Deletes a specific task.
     * @param {HTMLLIElement} listItem The list item element to delete.
     */
    function deleteTask(listItem) {
        if (confirm('Are you sure you want to delete this task?')) {
            listItem.remove();
            saveTasks();
        }
    }

    /**
     * Saves the current tasks to Local Storage.
     */
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.querySelector('span').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Loads tasks from Local Storage and renders them on the page.
     */
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }
});