const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {

    if (request.url === '/') {
        const html = fs.readFileSync('presentacion.html', 'utf8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }

    else if (request.url === '/presentacion_estilos.css') {
        const css = fs.readFileSync('presentacion_estilos.css');
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(css);
    }

    else if (request.url === '/lab8.js') {
        const js = fs.readFileSync('lab8.js');
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(js);
    }

    else if (request.url === '/main.js') {
        const js = fs.readFileSync('main.js');
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(js);
    }
    else if (request.url === '/header-md.jpg') {
        const img = fs.readFileSync('header-md.jpg');
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        response.end(img);
    }

    else {
        response.writeHead(404);
        response.end("Not found");
    }

});

server.listen(3000);