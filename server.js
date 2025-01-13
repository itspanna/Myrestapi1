const express = require('express');
const db = require('./db/connection'); 
const app = express();


app.use(express.json()); 


app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


app.post('/users', (req, res) => {
    const { id, name, value, category, timestamp } = req.body;
    db.query('INSERT INTO users (id, name, value, category, timestamp) VALUES (?, ?, ?, ?, ?)', [id, name, value, category, timestamp], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id, name, value, category, timestamp });
    });
});


app.put('/users/:id', (req, res) => {
    const { name, value, category, timestamp } = req.body;
    db.query('UPDATE users SET name = ?, value = ?, category = ?, timestamp = ? ', [name, value, category, timestamp], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: req.params.id, name, value, category, timestamp });
    });
});


app.patch('/users/:id', (req, res) => {
    const updates = req.body;
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [updates, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: req.params.id, ...updates });
    });
});

app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(204).send();
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
