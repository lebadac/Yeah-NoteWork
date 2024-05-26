function fetchNotesAndUpdateHTML() {
    return fetch('http://localhost:2001/notes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update HTML with fetched data
            console.log('Notes fetched successfully');
            renderNotes(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderNotes(data) {
    const todoListElement = document.getElementById('todo-list');

    if (todoListElement) {
        // Clear the todo list
        todoListElement.innerHTML = '';

        // Loop through the data and create HTML elements
        data.forEach(note => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo');

            const taskNameElement = document.createElement('h3');
            taskNameElement.textContent = note.TaskName;

            const typeElement = document.createElement('span');
            typeElement.classList.add('task-type');
            typeElement.style.color = 'red'; // Assuming 'urgent-important' is a red task
            typeElement.textContent = note.Type;

            const finishTodoButton = document.createElement('button');
            finishTodoButton.classList.add('finish-todo');
            const finishTodoIcon = document.createElement('i');
            finishTodoIcon.classList.add('fa-solid', 'fa-check');
            finishTodoButton.appendChild(finishTodoIcon);

            const editTodoButton = document.createElement('button');
            editTodoButton.classList.add('edit-todo');
            const editTodoIcon = document.createElement('i');
            editTodoIcon.classList.add('fa-solid', 'fa-pen');
            editTodoButton.appendChild(editTodoIcon);

            const removeTodoButton = document.createElement('button');
            removeTodoButton.classList.add('remove-todo');
            const removeTodoIcon = document.createElement('i');
            removeTodoIcon.classList.add('fa-solid', 'fa-xmark');
            removeTodoButton.appendChild(removeTodoIcon);

            todoElement.appendChild(taskNameElement);
            todoElement.appendChild(typeElement);
            todoElement.appendChild(finishTodoButton);
            todoElement.appendChild(editTodoButton);
            todoElement.appendChild(removeTodoButton);

            todoListElement.appendChild(todoElement);
        });
    } else {
        console.error('Error: #todo-list element not found in the DOM');
    }
}

// Fetch and render the notes
fetchNotesAndUpdateHTML()
    .catch(error => console.error('Error rendering notes:', error));
