const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flashcards_routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(flashcards_routes)

app.listen(8080);
