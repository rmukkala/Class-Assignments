// Set base path to reflect GitHub Pages URL structure
const basePath = '/Class-Assignments/Project/'; // Adjust if needed

// Fetch the data.json file from the correct location
fetch(`${basePath}data.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear existing content

        console.log('Data loaded:', data); // Log the data to ensure it's loaded

        data.forEach(task => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.innerHTML = `<h3>${task.title}</h3>`;
            thumbnail.addEventListener('click', () => loadTask(task.title, task.files)); // Pass title and files for task
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

// Load task content dynamically
function loadTask(title, files) {
    console.log('Loading task:', title);

    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('modal-task-details');
    modalContent.innerHTML = ''; // Clear existing content in modal

    if (files && files.length > 0) {
        files.forEach(file => {
            const fileLink = document.createElement('a');
            fileLink.href = `${basePath}Tasks/${file}`;
            fileLink.textContent = file;
            fileLink.classList.add('task-file');
            modalContent.appendChild(fileLink);
            modalContent.appendChild(document.createElement('br'));
        });
    } else {
        modalContent.innerHTML = '<p>No files available for this task.</p>';
    }

    modal.style.display = "block"; // Show the modal
}

// Close Modal Logic
const modal = document.getElementById('task-modal');
const closeButton = document.querySelector('.close-button');

closeButton.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
