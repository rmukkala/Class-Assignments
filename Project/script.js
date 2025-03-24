// Load the JSON data and map tasks
fetch('data.json')
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
            thumbnail.addEventListener('click', () => loadTask(task.file));
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

// Load task content dynamically
function loadTask(taskFile) {
    console.log('Loading task:', taskFile); // Log the task file being loaded

    fetch(`Tasks/${taskFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Task content loaded:', data); // Log the loaded content
            document.getElementById('task-display').innerHTML = data; // Insert the content into the task display area
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('task-display').innerHTML = `<p style="color: red;">Error loading task: ${error.message}</p>`;
        });
}
