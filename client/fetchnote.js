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
            typeElement.style.color = note.Type === 'urgent-important' ? 'red' : 'inherit'; // Assuming 'urgent-important' is a red task
            typeElement.textContent = note.Type;

            const finishTodoButton = document.createElement('button');
            finishTodoButton.classList.add('finish-todo');
            finishTodoButton.addEventListener('click', () => markTaskAsDone(note.id)); // Add click event listener
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
            // Add the click event listener for the remove button
            removeTodoButton.addEventListener('click', () => {
                removeTask(note.id);
            });

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
function markTaskAsDone(taskId) {
    // Code to update the task status to "Done" on the server
    fetch(`http://localhost:2001/notes/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // No need to send the status in the request body, as the server-side route will update the status to "Done"
    })
        .then(response => {
            if (response.ok) {
                console.log('Task marked as done');
                // Refresh the UI by calling fetchNotesAndUpdateHTML()
                fetchNotesAndUpdateHTML()
                    .catch(error => console.error('Error rendering notes:', error));
            } else {
                console.error('Error marking task as done');
            }
        })
        .catch(error => {
            console.error('Error updating task status:', error);
        });
}
function removeTask(taskId) {
    fetch(`http://localhost:2001/notes/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Task removed successfully');
                // Optionally, you can call fetchNotesAndUpdateHTML() here to refresh the UI
            } else {
                console.error('Error removing task');
            }
        })
        .catch(error => {
            console.error('Error removing task:', error);
        });
}
// Fetch and render the notes
fetchNotesAndUpdateHTML()
    .catch(error => console.error('Error rendering notes:', error));
