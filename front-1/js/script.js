const BASE_URL = 'http://localhost:8080';

let currentEditingId = null;

function loadMusic() {
    fetch(`${BASE_URL}/musicas`)
        .then(response => response.json())
        .then(data => {
            const musicTableBody = document.getElementById('musicTableBody');
            musicTableBody.innerHTML = '';

            data.forEach(music => {
                const row = `<tr>
                    <td>${music.id}</td>
                    <td>${music.artist}</td>
                    <td>${music.music}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editMusic(${music.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteMusic(${music.id})">Delete</button>
                    </td>
                </tr>`;
                musicTableBody.innerHTML += row;
            });
        });
}

document.getElementById('musicForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const artist = document.getElementById('artistInput').value;
    const music = document.getElementById('musicInput').value;

    fetch(`${BASE_URL}/musicas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ artist, music })
    })
    .then(() => {
        loadMusic();
        document.getElementById('artistInput').value = '';
        document.getElementById('musicInput').value = '';
    });
});

function editMusic(id) {
    console.log(`Editar música com ID ${id}`);
    currentEditingId = id;

    fetch(`${BASE_URL}/musicas/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('artistInput').value = data.artist;
            document.getElementById('musicInput').value = data.music;

            const submitButton = document.querySelector('.btn-primary');
            submitButton.textContent = 'Save Changes';
            document.getElementById('musicForm').removeEventListener('submit', handleSubmit);
            document.getElementById('musicForm').addEventListener('submit', handleEditSubmit);
        });
}

function handleEditSubmit(event) {
    event.preventDefault();

    const artist = document.getElementById('artistInput').value;
    const music = document.getElementById('musicInput').value;

    fetch(`${BASE_URL}/musicas/${currentEditingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ artist, music })
    })
    .then(() => {
        document.getElementById('artistInput').value = '';
        document.getElementById('musicInput').value = '';
        const submitButton = document.querySelector('.btn-primary');
        submitButton.textContent = 'Add Music';
        document.getElementById('musicForm').removeEventListener('submit', handleEditSubmit);
        document.getElementById('musicForm').addEventListener('submit', handleSubmit);
        loadMusic();
    });
}

function deleteMusic(id) {
    fetch(`${BASE_URL}/musicas/delete/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        loadMusic();
    });
}

loadMusic();
