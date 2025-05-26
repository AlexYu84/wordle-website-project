const express = require('express');
const router = express.Router();
const characters = require('../data/characters.json');

router.get('/random', (req, res) => {
  const names = characters.map(c => c.name);
  const random = names[Math.floor(Math.random() * names.length)];
  res.json({ name: random.toUpperCase() });
});

module.exports = router;