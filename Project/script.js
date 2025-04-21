// Set base path to reflect GitHub Pages URL structure
const basePath = '/Class-Assignments/Project/';

// Fetch the data.json file from the correct location
fetch(`${basePath}data.json`)
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const imageUrl = `${basePath}image/${index + 1}.jpg`;

            thumbnail.innerHTML = `
                <div class="image-container">
                    <img src="${imageUrl}" alt="${task.title}" class="task-image" />
                    <div class="overlay">${task.title}</div>
                </div>
            `;

            thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

// Load task content dynamically
function loadTaskContent(title, files) {
    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('modal-task-details');
    modalContent.innerHTML = '<p>Loading...</p>';
    modal.style.display = "block";

    if (files && files.length > 0) {
        const fileUrl = files[0];
        const isZip = fileUrl.endsWith('.zip');

        modalContent.innerHTML = `
            <h3>${title}</h3>
            ${isZip ? `
                <p>This task is a downloadable ZIP file. Click below to download:</p>
                <a href="${basePath}${fileUrl}" download class="download-btn">Download ZIP</a>
            ` : `
                <iframe src="${basePath}${fileUrl}" width="100%" height="500px" frameborder="0"
                    style="border: none; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
                </iframe>
            `}
        `;
    } else {
        modalContent.innerHTML = '<p>No files available for this task.</p>';
    }
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('task-modal').style.display = "none";
};
window.onclick = event => {
    if (event.target === document.getElementById('task-modal')) {
        document.getElementById('task-modal').style.display = "none";
    }
};
