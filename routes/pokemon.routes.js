const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canCreate = require('../util/can-create');
const canView = require('../util/can-view');

const pokedexControler = require('../controlers/pokedex.controler');

// Ruta principal
router.get('/', isAuth, canView, pokedexControler.get_inicio);

// Ruta para mostrar el formulario de nuevo Pokémon
router.get('/new', isAuth, canCreate, pokedexControler.get_new);

// Ruta para procesar el formulario de nuevo Pokémon
router.post('/new', isAuth, canCreate, pokedexControler.post_new);

// Ruta dinámica para las wikis de Pokémon
router.get('/wiki/:nombre', isAuth, canView, pokedexControler.get_wiki);

module.exports = router;