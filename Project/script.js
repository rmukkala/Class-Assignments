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

        data.forEach(task => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.innerHTML = `<h3>${task.title}</h3>`;
            thumbnail.addEventListener('click', () => loadTask(task.file));
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

// Function to load task file dynamically
function loadTask(taskFile) {
    // Correct path to fetch tasks from the 'Tasks' folder
    fetch(`${basePath}Tasks/${taskFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('task-display').innerHTML = data; // Display the task content in the task display area
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('task-display').innerHTML = `<p style="color: red;">Error loading task: ${error.message}</p>`;
        });
}
