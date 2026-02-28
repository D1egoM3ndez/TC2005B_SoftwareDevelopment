const http = require('http');
const fs = require('fs');

const pokemon = [
    {
        nombre: "Charizard",
        tipo: "Fuego",
        numero: "#006",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    },
    {
        nombre: "Pikachu",
        tipo: "Eléctrico",
        numero: "#025",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    },
    {
        nombre: "Squirtle",
        tipo: "Agua",
        numero: "#007",
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
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

const html_wiki = `
  <a class="btn-link" href="/">← Regresar</a>

  <div class="wiki-card">
    <img class="wiki-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png" alt="Charizard">

    <div class="wiki-info">
      <div class="wiki-number">#006</div>
      <h2 class="wiki-name">Charizard</h2>
      <p class="wiki-desc">
        Charizard vuela por los cielos en busca de rivales poderosos. Exhala llamas tan calientes que pueden derretir cualquier cosa. Nunca dirige su fuego feroz hacia un oponente más débil que él.
      </p>
    </div>
  </div>`;


const html_form = `
<a class="btn-link" href="/">← Regresar</a>
<h2 class="form-title">Nuevo Pokémon</h2>
<form class="poke-form" action="/new" method="POST">
    <input name="nombre" placeholder="Nombre" type="text" required>
    <input name="tipo" placeholder="Tipo" type="text" required>
    <input name="numero" placeholder="#Número" type="text" required>
    <input name="imagen" placeholder="URL Imagen" type="text" required>
    <button type="submit">Guardar</button>
</form>
`;

const server = http.createServer((request, response) => {

    // ── Página principal con la grid
    if (request.url === '/') {
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
                        <a href = "/wiki">Ver más</a>
                    </div>
                </div>
            `;
        }

        html_index += `</div>`;

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html_header + html_index + html_footer);
    }

    // ── CSS 
    else if (request.url === '/pokedex.css') {
        const css = fs.readFileSync('pokedex.css');
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(css);
    }

    // ── Formulario GET 
    else if (request.url === '/new' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html_header + html_form + html_footer);
    }

    // ── Guardar Pokémon POST 
    else if (request.url === '/new' && request.method === 'POST') {

        response.setHeader('Content-Type', 'text/html');
        const pokemon_nuevo = [];
    
        request.on('data', (data) => {
            console.log(data);
            pokemon_nuevo.push(data);
        });
    
        request.on('end', () => {
            const string_datos_completos = Buffer.concat(pokemon_nuevo).toString();
            console.log(string_datos_completos);

            pokemon.push({
                nombre: decodeURIComponent(string_datos_completos.split('&')[0].split('=')[1]),
                tipo: decodeURIComponent(string_datos_completos.split('&')[1].split('=')[1]),
                numero: decodeURIComponent(string_datos_completos.split('&')[2].split('=')[1]),
                imagen: decodeURIComponent(string_datos_completos.split('&')[3].split('=')[1]),
            });

            response.write(html_header + "Se guardó el nuevo pokemon con los siguientes datos: " + 
            string_datos_completos + html_footer);
            response.end();
        });

    }

    else if(request.url == '/wiki' && request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html_header + html_wiki + html_footer);
    }

    // ── 404 ────
    else {
        response.writeHead(404);
        response.end('Not found');
    }

});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});