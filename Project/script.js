const basePath = './'; // basePath is now at root level

fetch(`${basePath}Project/data.json`) //data.json is inside project folder
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            // Construct the image path correctly
            const imagePath = `${basePath}images/${index + 1}.jpg`;

            // Check if the image exists (optional, but good practice)
            const img = new Image();
            img.onload = () => {
                // Image loaded successfully, add it to the thumbnail
                thumbnail.innerHTML = `
                    <img src="${imagePath}" alt="Task ${index + 1}">
                    <h3>${task.title}</h3>
                `;
                thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));
                taskList.appendChild(thumbnail);
            };
            img.onerror = () => {
                // Image failed to load, add a placeholder or error message
                thumbnail.innerHTML = `
                    <div class="image-placeholder">Image not found</div>
                    <h3>${task.title}</h3>
                `;
                thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));
                taskList.appendChild(thumbnail);
                console.error(`Image not found: ${imagePath}`); // Log the error
            };

            img.src = imagePath; // Start loading the image
        });
    })
    .catch(error => console.error('Error loading task data:', error));

function loadTaskContent(title, files) {
    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('modal-task-details');

    modalContent.innerHTML = `
        <h3>${title}</h3>
        <iframe src="${basePath}Tasks/${files[0]}" width="100%" height="500px" frameborder="0"></iframe>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('task-modal').style.display = "none";
};
