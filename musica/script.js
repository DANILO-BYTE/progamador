// Exibir todos os artistas
function loadArtistas() {
    fetch('http://localhost:3000/api/artistas')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('artista-list');
            list.innerHTML = '';
            data.forEach(artista => {
                list.innerHTML += `
                <div>
                    <p>${artista.nome} - ${artista.estilo} - ${artista.genero} </p>
                    <button onclick="deleteArtista(${artista.id_artista})">Excluir</button>
                    <button onclick="editArtista(${artista.id_artista})">Editar</button>
                </div>`;
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Exibir todos os albuns
function loadAlbuns() {
    fetch('http://localhost:3000/api/albuns')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('albuns-list');
            list.innerHTML = '';
            data.forEach(albuns => {
                list.innerHTML += `
                <div>
                    <p>${albuns.titulo} - ${albuns.data_criacao} - ${albuns.qnt_musica} </p>
                    <button onclick="deleteAlbum(${albuns.id_album})">Excluir</button>
                    <button onclick="editAlbum(${albuns.id_album})">Editar</button>
                </div>`;
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Exibir todos os artistas
function loadPossui() {
    fetch('http://localhost:3000/api/artistas')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('possui-list');
            list.innerHTML = '';
            data.forEach(possui => {
                list.innerHTML += `
                <div>
                    <p>${possui.nome} - ${possui.estilo}</p>
                </div>`;
            });
        })
        .catch(error => console.error('Erro:', error));
}


//Adicionar novo artista
document.getElementById('artista-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const estilo = document.getElementById('estilo').value;
    const genero = document.getElementById('estilo').value;

    fetch('http://localhost:3000/api/artistas', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nome, estilo, genero })
    })
        .then(() => {
            loadArtistas();
            document.getElementById('artista-form');
        })
        .catch(error => console.error('Erro:'.error));
});

//Adicionar novo album
document.getElementById('albuns-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const data_criacao = document.getElementById('data_criacao').value;
    const qnt_musica = document.getElementById('qnt_musica').value;

    fetch('http://localhost:3000/api/albuns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ titulo, data_criacao, qnt_musica })
    })
        .then(() => {
            loadAlbuns();
            document.getElementById('albuns-form');
        })
        .catch(error => console.error('Erro:'.error));
});

// Deletar artista
function deleteArtista (id) {
    fetch(`http://localhost:3000/api/artistas/${id}`, { method: 'DELETE' })
     .then(() => loadArtistas())
     .catch(error => console.error('Erro:', error));
}

// Deletar artista
function deleteAlbum (id) {
    fetch(`http://localhost:3000/api/albuns/${id}`, { method: 'DELETE' })
     .then(() => loadAlbuns())
     .catch(error => console.error('Erro:', error));
}

//Editar Artista
function editArtista(id, nome, estilo, genero){
    const nomeNovo = prompt('Novo nome:', nome);
    const estiloNovo = prompt('Novo estilo:',estilo);
    const generoNovo = prompt('Novo genero:', genero);

    fetch(`http://localhost:3000/api/artistas/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome: nomeNovo, estilo: estiloNovo, genero:generoNovo})
    })
    .then(() => loadArtistas())
    .catch(error => console.error('Erro:',error));
}

//Editar Albuns
function editAlbum(id, titulo, data_criacao, qnt_musica){
    const tituloNovo = prompt('Novo titulo:', titulo);
    const dataNovo = prompt('Novo data de criacao:',data_criacao);
    const qntNovo = prompt('Novo qnt_musica:', qnt_musica);

    fetch(`http://localhost:3000/api/albuns/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titulo: tituloNovo, data_criacao: dataNovo, qnt_musica:qntNovo})
    })
    .then(() => loadAlbuns())
    .catch(error => console.error('Erro:',error));
}

loadArtistas();
loadPossui();
loadAlbuns();