const basePath = './';

fetch(`${basePath}data.json`)
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const imagePath = `${basePath}images/${index + 1}.jpg`;  // Updated to match the image names
            const taskPath = `${basePath}Tasks/${task.files[0]}`;  // Correct task file path

            thumbnail.innerHTML = `
                <img src="${imagePath}" alt="${task.title}" />
                <h3>${task.title}</h3>
            `;

            thumbnail.addEventListener('click', () => loadTask(task.title, taskPath));
            taskList.appendChild(thumbnail);
        });
    });

function loadTask(title, path) {
    document.getElementById('modal-task-details').innerHTML = `
        <h3>${title}</h3>
        <iframe src="${path}" frameborder="0" width="100%" height="500px"></iframe>
    `;
    document.getElementById('task-modal').style.display = 'block';
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('task-modal').style.display = 'none';
};
