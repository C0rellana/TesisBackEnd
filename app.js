const http = require('http')
const logger = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const routes = require('./server/routes')

const hostname = '192.168.18.37';
const port = 5000;
const app = express()
const server = http.createServer(app);


// Mostrar peticiones por consola
app.use(logger('dev')); 

//configuracion de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importar rutas
routes(app);

server.listen(port, hostname, () => {
  console.log(`API:  http://${hostname}:${port}/`);
});