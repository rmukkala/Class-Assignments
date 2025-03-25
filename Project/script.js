const basePath = './';

fetch(`${basePath}data.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load data.json: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            // Construct correct image path
            const imagePath = `${basePath}images/${index + 1}.jpg`;
            console.log(`Loading image: ${imagePath}`); // Debugging output

            // Add thumbnail content
            thumbnail.innerHTML = `
                <img src="${imagePath}" alt="Task ${index + 1}" class="task-image" />
                <h3>${task.title}</h3>
            `;

            thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

function loadTaskContent(title, files) {
    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('modal-task-details');

    // Construct task path correctly
    const taskPath = `${basePath}Tasks/${files[0]}`;
    console.log(`Loading task: ${taskPath}`); // Debugging output

    modalContent.innerHTML = `
        <h3>${title}</h3>
        <iframe src="${taskPath}" width="100%" height="500px" frameborder="0"></iframe>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('task-modal').style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById('task-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
