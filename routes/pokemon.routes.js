const express = require('express');
const router = express.Router();

const pokedexControler = require('../controlers/pokedex.controler');

// Ruta principal
router.get('/', pokedexControler.get_inicio);

// Ruta para mostrar el formulario de nuevo Pokémon
router.get('/new', pokedexControler.get_new);

// Ruta para procesar el formulario de nuevo Pokémon
router.post('/new', pokedexControler.post_new);

// Ruta dinámica para las wikis de Pokémon
router.get('/wiki/:nombre', pokedexControler.get_wiki);

module.exports = router;