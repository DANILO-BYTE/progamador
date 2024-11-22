
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