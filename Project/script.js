const basePath = './';

fetch(`${basePath}data.json`)
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.innerHTML = `
                <img src="${basePath}images/${index + 1}.jpg" alt="Task ${index + 1}">
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

    modalContent.innerHTML = `
        <h3>${title}</h3>
        <iframe src="${basePath}Tasks/${files[0]}" width="100%" height="500px" frameborder="0"></iframe>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('task-modal').style.display = "none";
};
