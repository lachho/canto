const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;  // You can choose any available port

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
    user: 'my_user',          // Your PostgreSQL user
    host: 'localhost',        // Your host
    database: 'my_database',  // Your database
    password: 'my_password',  // Your password
    port: 5432,               // Default PostgreSQL port
});

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Add a new word
app.post('/words', async (req, res) => {
    let { english, yale, tones, chinese, tags } = req.body;
    try {
        tags = tags.split(',').map(tag => tag.trim());
        const newWord = await pool.query(
            'INSERT INTO words (english, yale, tones, chinese, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [english, yale, tones, chinese, tags]
        );
        res.status(201).json(newWord.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get all words
app.get('/words', async (req, res) => {
    try {
        const allWords = await pool.query('SELECT * FROM words');
        res.json(allWords.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
