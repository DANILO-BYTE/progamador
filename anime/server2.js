// importando os modulos necessarios
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

//configurando o  CORS e o parser de JSON 
const app = express();
app.use(cors());
app.use(bodyParser.json());

// confuguraçao de conexao com o banco de dados 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    database: 'animeflix',
    port: 3307
});

// conectando com o banco de dados
db.connect(err => {
    if (err) {
        console.error('erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('conectado com o banco de dados');
});

// rota GET para listar todas as pessoas
app.get('/api/anime', (req, res) => {
    db.query('SELECT * FROM anime', (err, results) => {
        if (err) {
            console.error('Erro ao listar anime:', err);
            res.status(500).send('Erro ao listar anime');
            return;
        }
        res.send(results);
    });
});


app.get('/api/assiste', (req, res) => {
    db.query('SELECT pessoa.nome, anime.titulo, assiste.data_assistiu FROM Anime JOIN assiste ON anime.id_anime = assiste.id_anime JOIN pessoa ON assiste.id_pessoa = pessoa.id_pessoa; ', (err, results) => {
        if (err) {
            console.error('Erro ao listar assiste:', err);
            res.status(500).send('Erro ao listar assiste');
            return;
        }
        res.send(results);
    });
});

// rota POST para adicionar uma nova pessoa
app.post('/api/anime', (req, res) => {
    const { titulo, genero, ano_lancamento } = req.body;
    const sql = 'INSERT INTO anime (titulo, genero, ano_lancamento) VALUES (?,?,?)';
    db.query(sql, [titulo, genero, ano_lancamento], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar anime:', err);
            res.status(500).send('Erro ao adicionar anime');
            return;
        }
        res.status(201).send('anime adicionada com sucesso');
    });
});

// rota PUT para atualizar uma pessoa existente
app.put('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano_lancamento } = req.body;
    const sql = 'UPDATE anime SET titulo = ?, genero = ?, ano_lancamento = ?, WHERE id_anime = ?';
    db.query(sql, [titulo, genero, ano_lancamento, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar pessoa');
            return;
        }
        res.send('anime atualizada com sucesso');
    });
});

// rota DELETE para remover uma pessoa ]
app.delete('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM anime WHERE id_anime =?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao remover pessoa:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('anime removida com sucesso');
    });
});

// iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


