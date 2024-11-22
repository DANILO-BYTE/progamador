// HTML + JavaScript no frontend 
// chama a API para exibir a lista de personagens 
fetch('http://localhost:3000/api/pessoas')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('character-list');
        data.forEach(person => {
            list.innerHTML += `<p>${person.nome} (${person.idade}) - ${person.email}
                </p>`;
        });
    })
    .catch(error => console.error('erro:', error));