// Select elements from the DOM
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const taskTypeInput = document.querySelector("#task-type");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editTaskTypeInput = document.querySelector("#edit-task-type");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const controls = document.querySelector("#controls"); // Select the controls section
const filterSelect = document.querySelector("#filter-select");
let oldInputValue; // Declare globally
let oldTaskType; // Declare globally

// Display the current date
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

// Function to display current time and update every half second
function time() {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    // Add leading zeros if necessary
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
    setTimeout(time, 500);
}

// Add event listener for the form submission to add a new todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    const taskTypeValue = taskTypeInput.value;
    if (inputValue) saveTodo(inputValue, taskTypeValue);
});

// Function to save a new todo item
const saveTodo = (text, type) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const taskTypeSpan = document.createElement("span");
    taskTypeSpan.classList.add("task-type");
    taskTypeSpan.innerText = type;
    todo.appendChild(taskTypeSpan);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    taskTypeInput.value = "urgent-important";
    todoInput.focus();
};

// Add event listener for document clicks to handle various actions
document.addEventListener("click", (e) => {
    const targetE1 = e.target;
    const parentE1 = targetE1.closest(".todo");
    let todoTitle;
    let todoType;

    if (parentE1 && parentE1.querySelector("h3")) {
        todoTitle = parentE1.querySelector("h3").innerText;
        todoType = parentE1.querySelector(".task-type").innerText;
    }

    if (targetE1.classList.contains("finish-todo")) {
        parentE1.classList.toggle("done");
    }

    if (targetE1.classList.contains("remove-todo")) {
        parentE1.remove();
    }

    if (targetE1.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        editTaskTypeInput.value = todoType;
        oldInputValue = todoTitle;
        oldTaskType = todoType;
        controls.classList.toggle("hide");
    }

    if (targetE1.classList.contains("clear-btn")) {
        clearAllTodos();
    }

    if (targetE1.id === "all") {
        filterTodos("all");
    }

    if (targetE1.id === "pending") {
        filterTodos("pending");
    }

    if (targetE1.id === "completed") {
        filterTodos("completed");
    }

    if (targetE1.id === "urgent-important") {
        filterTodos("urgent-important");
    }

    if (targetE1.id === "urgent-not-important") {
        filterTodos("urgent-not-important");
    }

    if (targetE1.id === "not-urgent-important") {
        filterTodos("not-urgent-important");
    }

    if (targetE1.id === "not-urgent-not-important") {
        filterTodos("not-urgent-not-important");
    }
});

// Function to toggle the visibility of forms and controls
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    controls.classList.toggle("hide"); // Toggle the visibility of the controls section
};

// Add event listener to cancel edit action
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

// Add event listener for the edit form submission to update a todo
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    const editTaskTypeValue = editTaskTypeInput.value;
    if (editInputValue) updateTodo(editInputValue, editTaskTypeValue);

    toggleForms();
});

// Function to update a todo item
const updateTodo = (text, type) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        let taskTypeSpan = todo.querySelector(".task-type");
        if (todoTitle.innerText === oldInputValue && taskTypeSpan.innerText === oldTaskType) {
            todoTitle.innerText = text;
            taskTypeSpan.innerText = type;
        }
    });
};

// Function to clear all todo items
const clearAllTodos = () => {
    todoList.innerHTML = "";
};

// Function to filter todo items based on a filter type
const filterTodos = (filter) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        switch (filter) {
            case "all":
                todo.style.display = "flex";
                break;
            case "pending":
                if (todo.classList.contains("done")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
            case "completed":
                if (todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "urgent-important":
                if (todo.querySelector(".task-type").innerText === "urgent-important") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "urgent-not-important":
                if (todo.querySelector(".task-type").innerText === "urgent-not-important") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "not-urgent-important":
                if (todo.querySelector(".task-type").innerText === "not-urgent-important") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "not-urgent-not-important":
                if (todo.querySelector(".task-type").innerText === "not-urgent-not-important") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });

    // Highlight the selected filter
    document.querySelectorAll(".filters span").forEach((span) => {
        span.classList.remove("active");
    });

    document.getElementById(filter).classList.add("active");
};

// Add event listener to the filter select element
filterSelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value;
    filterTodos(selectedValue); // Call the filterTodos function with the selected value
});
