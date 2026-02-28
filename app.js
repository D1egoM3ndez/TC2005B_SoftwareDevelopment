const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

const rutas_pokemon = require('./routes/pokemon.routes');
app.use('/', rutas_pokemon);

app.listen(3000);