const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/game');

const app = express();
app.use(cors());
app.use('/api', gameRoutes);

app.listen(3001, () => console.log('Server running on port 3001'));