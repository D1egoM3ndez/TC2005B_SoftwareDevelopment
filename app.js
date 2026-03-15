const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
    secret: 'string secreto largo', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutas_pokemon = require('./routes/pokemon.routes');
app.use('/', rutas_pokemon);

const users_routes = require('./routes/user.routes');
app.use('/user', users_routes);

app.use((error, request, response, next) => {
    response.status(500).send(`Error interno del servidor: ${error.stack}`);
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});