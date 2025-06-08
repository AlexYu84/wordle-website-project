const express = require('express');
const router = express.Router();
const characters = require('../data/characters.json');

// GET all characters
router.get('/', (req, res) => {
  res.json(characters);
});

// GET a random character
router.get('/random', (req, res) => {
  const randomChar = characters[Math.floor(Math.random() * characters.length)];
  res.json(randomChar);
});

module.exports = router;
