const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    database: 'animeflix',
    port: '3307'
});

//conexão com o banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('conecatado ao banco de dados');
});

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// configurando o CORS e o parser de JSON
app.use(cors());

// configuraçao de conexao com o banco de dados
app.use(bodyParser.json());

// conectando com o banco de dados 
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('conecatado ao banco de dados');
});

// rota GET para listar todas as pessoas 

app.get('/api/pessoas', (req, res) => {
    db.query('SELECT * FROM pessoa', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});
//iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));



