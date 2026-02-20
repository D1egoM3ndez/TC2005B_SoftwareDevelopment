console.log("hola desde node");

//const filesystem = require('fs');

setTimeout(() => {
    console.log("jojojo te hackié");
}, 15000);

const arreglo = [5000, 9, 60, 90, 10, 20, 100, 0, 120, 2000, 340];

for (let item of arreglo){
    setTimeout(() => {
        console.log(item);
    }, item);
}

const html = "";

const http = require('http');

const server = http.createServer( (request, response) => {
    console.log(request.url);
    console.log(response.url);

    response.setHeader('Content-Type', 'text/html');

    response.end();
});

server.listen(3000);