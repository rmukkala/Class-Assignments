const basePath = '/Class-Assignments/Project/'; // Correct path for GitHub repository

// Load data.json
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

// Function to load the task file dynamically
function loadTask(taskFile) {
    fetch(`${basePath}Tasks/${taskFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('task-display').innerHTML = data; // Display task content
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('task-display').innerHTML = `<p style="color: red;">Error loading task: ${error.message}</p>`;
        });
}
