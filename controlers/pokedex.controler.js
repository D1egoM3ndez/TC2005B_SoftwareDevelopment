const Pokedex = require('../models/pokedex.model');

exports.get_new = (request, response, next) => {
    response.render('new');
};

exports.post_new = (request, response, next) => {
    const pokemon = new Pokedex (request.body.nombre, request.body.tipo, request.body.numero, request.body.imagen, request.body.descripcion);

    pokemon.save();

    response.redirect('/');
};

exports.get_wiki = (req, res) => {
    const nombreBusqueda = req.params.nombre;

    const encontrado = Pokedex.fetchAll().find(p =>
        p.nombre.toLowerCase() === nombreBusqueda.toLowerCase()
    );

    res.render('wiki', { pokemon: encontrado });
};

exports.get_inicio = (request, response, next) => {
    const pokemones = Pokedex.fetchAll();

    response.render('list', {pokedex: pokemones});
};