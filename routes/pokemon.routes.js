const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const pokedexControler = require('../controlers/pokedex.controler');

// Ruta principal
router.get('/', isAuth, pokedexControler.get_inicio);

// Ruta para mostrar el formulario de nuevo Pokémon
router.get('/new', isAuth, pokedexControler.get_new);

// Ruta para procesar el formulario de nuevo Pokémon
router.post('/new', isAuth, pokedexControler.post_new);

// Ruta dinámica para las wikis de Pokémon
router.get('/wiki/:nombre', isAuth, pokedexControler.get_wiki);

module.exports = router;