require( './config/config' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const session = require( 'cookie-session' );
const port = process.env.PORT;
const app = express();

// Middleware
// Informacion detalla en el terminal
app.use( morgan( 'dev' ) );
// Obtener los datos de las peticiones post en el atributo body del request
app.use(
  bodyParser.urlencoded( {
    extended: true
  } )
);
// Configuracion cookie-session
app.use(
  session( {
    secret: 'node'
  } )
);

// Configuracion de EJS Template Engine
app.set( 'view engine', 'ejs' );

//Compartir Recursos 
app.use('/public', express.static('public'))


let tareas = [ 'uno', 'dos' ];

// Ruta Inicial
app.get( '/', function ( request, response ) {
  response.render( 'formulario.ejs', {
    tareas
  } );
} );

// Ruta Formulario adicionar
app.post( '/adicionar', function ( request, response ) {
  let tarea = request.body.nuevaTarea;
  tareas.push( tarea );
  response.redirect( '/' )
} );

// Eliminar tareas
app.get( '/borrar/:id', function ( request, response ) {
  let id = +request.params.id;
  tareas.splice( id, 1 )
  // console.log( id )
  response.redirect( '/' )
} )

app.listen( port, function () {
  console.log( 'Escuchando en el puerto: ', port );
} );