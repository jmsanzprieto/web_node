const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const port = 3000;


// Importar las rutas desde el archivo externo
const routes = require('./config/routes');
const formRoutes = require('./routes/formRoutes'); // Importar las rutas del formulario

// Importar el fichero de configuracion
const config = require('./config/config');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sesión y flash
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Middleware para pasar las rutas, el título de la página, el título de la web y el subtítulo a todas las vistas
app.use((req, res, next) => {
  res.locals.routes = routes;
  res.locals.title = config.title;
  res.locals.webTitle = config.webTitle;
  res.locals.msg = req.flash('msg');
  res.locals.msgType = req.flash('msgType');

  // Obtener el subtítulo de la ruta actual
  const currentPath = req.path;
  const currentRoute = routes.find(route => route.path === currentPath);
  if (currentRoute) {
    res.locals.subtitle = currentRoute.subtitle;
    res.locals.backgroundImage = currentRoute.backgroundImage;
  } else {
    res.locals.subtitle = ''; // Si no se encuentra la ruta, establecer el subtítulo en blanco
    res.locals.backgroundImage = ''; // Inicializar la imagen de fondo
  }

  next();
});

// Rutas
app.get('/', (req, res) => {
  res.locals.title = 'Inicio'; // Cambiar el título para la página de inicio si es necesario
  res.render('index');
});

app.get('/listado', (req, res) => {
  res.locals.title = 'Listado de Items'; // Cambiar el título para la página de listado si es necesario
  res.render('listado');
});

app.use('/', formRoutes); // Usar las rutas del formulario

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
