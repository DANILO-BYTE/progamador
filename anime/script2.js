// funçao para exibir a lista de pessas 
function loadAnime() {
    fetch('http://localhost:3000/api/anime')
       .then(response => response.json())
       .then(data => {
            const list = document.getElementById('anime-list');
            list.innerHTML = '';  // limpa a lista anterior
            data.forEach(anime => {
                list.innerHTML += `
                <div>
                    <p>${anime.titulo} (${anime.genero}) - ${anime.ano_lancamento}</p>
                    <button onclick="deleteAnime(${anime.id_anime})">Excluir</button>
                    <button onclick="editAnime(${anime.id_anime})">Editar</button>
                    </div>
                    `;
            });
        })
        .catch(error => console.error('Erro:', error)); 
}

function loadAssiste() {
    fetch('http://localhost:3000/api/assiste')
       .then(response => response.json())
       .then(data => {
            const list = document.getElementById('assiste-list');
            list.innerHTML = '';  // Clear the previous list
            data.forEach(assiste => {
                list.innerHTML += `
                <div>
                    <p>${assiste.nome} (${assiste.titulo}) - ${assiste.data_assistiu}</p>
                </div>
                `;
            });
        })
        .catch(error => console.error('Erro:', error)); 
}


// Adicionar nova anime
document.getElementById('anime-form').addEventListener('submit', (e) => { e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const genero = document.getElementById('genero').value;
  const ano_lancamento = document.getElementById('ano_lancamento').value;

  fetch('http://localhost:3000/api/anime', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, genero, ano_lancamento }),
  })
   .then(() => {
      loadAnime();
      document.getElementById('anime-form');
    })
   .catch(error => console.error('Erro:', error));
});  

// Deletar anime
function deleteAnime (id) {
    fetch(`http://localhost:3000/api/anime/${id}`, { method: 'DELETE' })
     .then(() => loadAnime())
     .catch(error => console.error('Erro:', error));
}

// Editar anime
function editAnime(id, titulo, genero, ano_lancamento) {
    const tituloNovo = prompt('novo titulo:', titulo);
    const generoNova = prompt('nova genero:', genero);
    const ano_lancamentoNovo = prompt('novo ano_lancamento:', ano_lancamento);
    
    fetch(`http://localhost:3000/api/anime/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: tituloNovo, genero: generoNova, ano_lancamento: ano_lancamentoNovo })
    })
    .then(() => loadAnime())
    .catch(error => console.error('Erro:', error));
}

loadAnime();
loadAssiste();