const express = require('express');
const router = express.Router();

const pokedex = [
    {
        nombre: "Charizard",
        tipo: "Fuego",
        numero: "#006",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
        descripcion: "Charizard vuela por los cielos en busca de rivales poderosos. Exhala llamas tan calientes que pueden derretir cualquier cosa. Nunca dirige su fuego feroz hacia un oponente más débil que él."
    },
    {
        nombre: "Pikachu",
        tipo: "Eléctrico",
        numero: "#025",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
        descripcion: "Pikachu almacena electricidad en las bolsas de sus mejillas. Cuando se encuentra con algo nuevo o se emociona, puede liberar descargas eléctricas de alto voltaje. Si se enfada, descarga toda la energía acumulada de una sola vez."
    },
    {
        nombre: "Squirtle",
        tipo: "Agua",
        numero: "#007",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        descripcion: "Squirtle se protege dentro de su resistente caparazón y dispara agua a presión para atacar a sus rivales. Cuando retrae su largo cuello, puede lanzar potentes chorros de agua con gran precisión."
    },
];

// Ruta principal
router.get('/', (request, response, next) => {
    response.render('list', {pokedex: pokedex});
});

// Ruta para mostrar el formulario de nuevo Pokémon
router.get('/new', (request, response, next) => {
    response.render('new');
});

// Ruta para procesar el formulario de nuevo Pokémon
router.post('/new', (request, response, next) => {
    const nuevoPokemon = request.body;
    console.log(nuevoPokemon);
    pokedex.push(nuevoPokemon);

    response.redirect('/');
});

// Ruta dinámica para las wikis de Pokémon
router.get('/wiki/:nombre', (req, res) => {

    const nombreBusqueda = req.params.nombre;

    const encontrado = pokedex.find(p =>
        p.nombre.toLowerCase() === nombreBusqueda.toLowerCase()
    );

    res.render('wiki', { pokemon: encontrado });

});

module.exports = router;