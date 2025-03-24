// Set base path to reflect GitHub Pages URL structure
const basePath = '/Class-Assignments/Project/';  // This assumes you are hosting on GitHub Pages under this path

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
    console.log('Loading task:', title); // Log the task title

    const taskDisplay = document.getElementById('task-display');
    taskDisplay.innerHTML = '';  // Clear existing content in task display area

    if (files && files.length > 0) {
        // Loop through the files and display them as links
        files.forEach(file => {
            const fileLink = document.createElement('a');
            fileLink.href = `${basePath}Tasks/${file}`;
            fileLink.textContent = file;
            fileLink.classList.add('task-file');
            taskDisplay.appendChild(fileLink);
            taskDisplay.appendChild(document.createElement('br'));  // Add a line break between files
        });
    } else {
        taskDisplay.innerHTML = '<p>No files available for this task.</p>';
    }
}
