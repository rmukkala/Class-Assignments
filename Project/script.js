const basePath = './Project/'; // Base path to Project folder
const imagePath = '../images/'; // Path to images folder at root level

fetch(`${basePath}data.json`) // Fetch data.json inside Project folder
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        data.forEach((task, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            // Construct the image path correctly
            const imgSrc = `${imagePath}${index + 1}.jpg`;
            console.log(`Loading image from: ${imgSrc}`); // Debugging

            // Add the thumbnail content first
            thumbnail.innerHTML = `
                <div class="image-placeholder">Loading...</div>
                <h3>${task.title}</h3>
            `;

            // Load task content on click
            thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));
            taskList.appendChild(thumbnail);

            // Attempt to load the image
            const img = new Image();
            img.onload = () => {
                thumbnail.querySelector('.image-placeholder').innerHTML = `
                    <img src="${imgSrc}" alt="Task ${index + 1}">
                `;
            };
            img.onerror = () => {
                console.error(`Image not found: ${imgSrc}`);
                thumbnail.querySelector('.image-placeholder').innerHTML = 'Image not found';
            };

            img.src = imgSrc; // Start loading the image
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

window.onclick = (event) => {
    if (event.target === document.getElementById('task-modal')) {
        document.getElementById('task-modal').style.display = "none";
    }
};
