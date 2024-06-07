// config/routes.js

const routes = [
  { 
    path: '/', 
    name: 'Inicio', 
    title: 'Home', 
    subtitle: 'Trabajando con Node.js', 
    backgroundImage: 'assets/img/home-bg.jpg' 
  },
  { 
    path: '/listado', 
    name: 'Listado', 
    title: 'Listado de Items', 
    subtitle: 'Un listado de cosas', 
    backgroundImage: 'assets/img/about-bg.jpg' 
  },
  { 
    path: '/contact', 
    name: 'Contacto', 
    title: 'Formulario de contacto', 
    subtitle: 'Formulario de contacto', 
    backgroundImage: 'assets/img/contact-bg.jpg' 
  }
];

module.exports = routes;
