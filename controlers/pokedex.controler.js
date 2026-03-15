const Pokedex = require('../models/pokedex.model');
const Tipo = require('../models/tipo.model');

exports.get_new = (request, response, next) => {
    response.render('new', {
        username: request.session.username || '',
    });
};

exports.post_new = (request, response, next) => {
    const pokemon = new Pokedex (request.body.nombre, request.body.tipo, request.body.numero, request.body.imagen, request.body.descripcion);

    pokemon.save().then(() => {
        return response.redirect('/personajes');
    }).catch((error) => {next(error)});

    response.redirect('/');
};

exports.get_wiki = (req, res) => {
    const nombreBusqueda = req.params.nombre;

    Pokedex.fetchOne(nombreBusqueda)
        .then(([rows, fieldData]) => {

        const encontrado = rows.find(p =>
            p.nombre.toLowerCase() === nombreBusqueda.toLowerCase()
        );

        res.render('wiki', {
            pokemon: encontrado,
            username: req.session.username || '',
        });

    })
        .catch(error => next(error));
};

exports.get_inicio = (request, response, next) => {
    console.log(request.session.username);
    Pokedex.fetchAll().then(([rows, fieldData]) => {
        return response.render('list', {
            username: request.session.username || '',
            pokedex: rows,
        }); 
    }).catch((error) => {
        next(error);
    });
};