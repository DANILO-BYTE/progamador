const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    database: 'playsong',
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error('erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('conectado com o banco de dados');
});

// Lista todos os artistas
app.get('/api/artistas', (req, res) => {
    db.query('SELECT * FROM Artistas', (err, results) => {
        if (err) {
            console.error('Erro ao listar artistas:', err);
            res.status(500).send('Erro ao listar artistas');
            return;
        }
        res.send(results);
    });
});

// Lista todos os albuns
app.get('/api/albuns', (req, res) => {
    db.query('SELECT * FROM Albuns', (err, results) => {
        if (err) {
            console.error('Erro ao listar albuns:', err);
            res.status(500).send('Erro ao listar albuns');
            return;
        }
        res.send(results);
    });
});

// Lista todos os possui
app.get('/api/possui', (req, res) => {
    db.query('SELECT * FROM Possui', (err, results) => {
        if (err) {
            console.error('Erro ao listar possui:', err);
            res.status(500).send('Erro ao listar possui');
            return;
        }
        res.send(results);
    });
});

// rota POST para adicionar um novo artistas
app.post('/api/artistas', (req, res) => {
    const {nome, estilo, genero} = req.body;
    const sql = 'INSERT INTO Artistas (nome, estilo, genero) VALUES (?, ?, ?)';
    db.query(sql, [nome, estilo, genero], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar artista:', err);
            res.status(500).send('Erro ao adicionar artista');
            return;
        }
        res.status(201).send('artista adicionada com sucesso');
    });
});

// rota POST para adicionar um novo album
app.post('/api/albuns', (req, res) => {
    const {titulo, data_criacao, qnt_musica} = req.body;
    const sql = 'INSERT INTO Albuns (titulo, data_criacao, qnt_musica) VALUES (?,?,?)';
    db.query(sql, [titulo, data_criacao, qnt_musica], (err, result) =>{
        if (err ) {
            console.error('Erro ao adicionar album:', err);
            res.status(500).send('Erro ao adicionar album');
            return;
        }
        res.status(201).send('Album adicionado com sucesso');
    });
});

// rota PUT para atualizar um artista
app.put('/api/artistas/:id', (req, res) => {
    const {id} = req.params;
    const {nome, estilo, genero} = req.body;
    const sql = 'UPDATE Artistas SET nome = ?, estilo = ?, genero = ?, WHERE id_artista = ?';
    db.query(sql, [nome, estilo, genero, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar pessoa');
            return;
        }
        res.send('artista atualizada com sucesso');
    })
});

// rota PUT para atualizar um album
app.put('/api/albuns/:id', (req,res) => {
    const {id} = req.params;
    const {titulo, estilo, genero} = req.body;
    const sql = 'UPDATE Albuns SET titulo = ?, data_criacao = ?, qnt_musica = ?, WHERE id_album = ?';
    db.query(sql, [titulo, estilo, genero], (err, result) =>{
        if (err){
            console.error('Erro ao atualizar dados:',err);
            res.status(500).send('Erro ao atualizar pessoa');
            return;
        }
        res.send('Album atualiazdo com sucesso');
    });
});

// rota DELETE para remover um artista
app.delete('/api/artistas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Artistas WHERE id_artista =?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Erro ao remover artitas:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('artistas removida com sucesso');
    });
});

// rota DELETE para remover um album
app.delete('/api/albuns/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Albuns WHERE id_album =?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Erro ao remover abuns:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('albuns removido com sucesso');
    });

});

// iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
