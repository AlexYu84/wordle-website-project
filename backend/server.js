const express = require('express');
const cors = require('cors');
const charactersRoute = require('./routes/characters');
const characters = require('./data/characters.json');


const app = express();
const PORT = 3000;

app.use(cors()); // Allows frontend to access backend
app.use(express.json());

app.use('/api/characters', charactersRoute);

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});