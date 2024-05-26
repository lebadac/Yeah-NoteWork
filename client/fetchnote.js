function fetchNotesAndUpdateHTML() {
    return fetch('/notes')
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
    const notesContainerElement = document.getElementById('notes-container');

    // Clear the notes container
    notesContainerElement.innerHTML = '';

    // Loop through the data and create HTML elements
    data.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        const taskNameElement = document.createElement('span');
        taskNameElement.textContent = note.TaskName;

        const typeElement = document.createElement('span');
        typeElement.textContent = note.Type;

        const statusElement = document.createElement('span');
        statusElement.textContent = note.Status;

        noteElement.appendChild(taskNameElement);
        noteElement.appendChild(document.createTextNode(' - '));
        noteElement.appendChild(typeElement);
        noteElement.appendChild(document.createTextNode(' - '));
        noteElement.appendChild(statusElement);

        notesContainerElement.appendChild(noteElement);
    });
}

// Fetch and render the notes
fetchNotesAndUpdateHTML()
    .catch(error => console.error('Error rendering notes:', error));