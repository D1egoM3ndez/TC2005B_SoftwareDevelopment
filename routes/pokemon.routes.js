const express = require('express');
const router = express.Router();
const fs = require('fs');

const pokemon = [
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

const html_header = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pokédex</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/pokedex.css">
</head>
<body>
<div class="container">
<h1>Pokédex</h1>
`;

const html_footer = `
</div>
</body>
</html>
`;

const html_form = `
<a class="btn-link" href="/">← Regresar</a>
<h2 class="form-title">Nuevo Pokémon</h2>
<form class="poke-form" action="/new" method="POST">
    <input name="nombre" placeholder="Nombre" type="text" required>
    <input name="tipo" placeholder="Tipo" type="text" required>
    <input name="numero" placeholder="#Número" type="text" required>
    <input name="imagen" placeholder="URL Imagen" type="text" required>
    <input name="descripcion" placeholder="Descripción" type="text" required>
    <button type="submit">Guardar</button>
</form>
`;

// Ruta principal
router.get('/', (request, response, next) => {
    let html_index = `
        <a class="btn-link" href="/new">Agregar Pokémon</a>
        <div class="grid">
    `;

    for (let poke of pokemon) {
        html_index += `
            <div class="card">
                <img class="card-img" src="${poke.imagen}" alt="${poke.nombre}">
                <div class="card-body">
                    <div class="card-name">${poke.nombre}</div>
                    <div class="card-number">${poke.numero}</div>
                    <a href="/wiki/${poke.nombre}">Ver más</a>
                </div>
            </div>
        `;
    }

    html_index += `</div>`;
    
    response.send(html_header + html_index + html_footer);
});

// Ruta para mostrar el formulario de nuevo Pokémon
router.get('/new', (request, response, next) => {
    response.send(html_header + html_form + html_footer);
});

// Ruta para procesar el formulario de nuevo Pokémon
router.post('/new', (request, response, next) => {
    const nuevoPokemon = request.body;

    console.log(nuevoPokemon);
    pokemon.push(nuevoPokemon);

    const texto = JSON.stringify(nuevoPokemon);

    fs.appendFile('pokemon.txt', texto, (err) => {
        if (err) {
            console.log("Error al guardar:", err);
        } else {
            console.log("Pokémon guardado en archivo");
        }
    });

    response.redirect('/');
});

// Ruta dinámica para las wikis de Pokémon
router.get('/wiki/:nombre', (request, response, next) => {
    const nombreBusqueda = request.params.nombre;
    
    // Buscamos el pokemon en nuestro arreglo
    const encontrado = pokemon.find(p => p.nombre.toLowerCase() === nombreBusqueda.toLowerCase());

    if (encontrado) {
        // Generamos el HTML de la wiki dinámicamente
        const html_wiki = `
            <a class="btn-link" href="/">← Regresar</a>

            <div class="wiki-card">
                <img class="wiki-img" src="${encontrado.imagen}" alt="${encontrado.nombre}">

                <div class="wiki-info">
                    <div class="wiki-number">${encontrado.numero}</div>
                    <h2 class="wiki-name">${encontrado.nombre}</h2>
                    <p class="wiki-tipo">Tipo: ${encontrado.tipo}</p>
                    <p class="wiki-desc">${encontrado.descripcion || 'Descripción no disponible'}</p>
                </div>
            </div>
        `;
        
        response.send(html_header + html_wiki + html_footer);
    } else {
        response.status(404).send(html_header + "<h2>Pokémon no encontrado</h2><a href='/'>Volver al inicio</a>" + html_footer);
    }
});

// Middleware para manejar rutas no encontradas
router.use((req, res) => {
    res.status(404).send(html_header + "<h2>404 - Página no encontrada</h2><a href='/'>Volver al inicio</a>" + html_footer);
});

module.exports = router;