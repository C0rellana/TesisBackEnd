
import Carrera from '../controllers/carrera';
import Ramo from '../controllers/ramo';
import Categoria from '../controllers/categoria';
import Archivos from '../controllers/archivos';

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

export default (app) => {

  app.post('/login', authController.login);
  app.post('/register', authController.register);
  

  /*Rutas para obtener datos de carreras*/
  app.get('/carreras',Carrera.List); 
  app.get('/carrerasramos',Carrera.CarreraRamos); 
  
  /*Rutas para obtener datos de ramos*/
  app.get('/ramos/:id',Ramo.RamosbyCarrera); 

   /*Rutas para obtener datos de categorias*/
   app.get('/categorias/:id',Categoria.List); 
  
  /*Rutas para obtener datos de Archivos*/
  app.post('/archivos',Archivos.Subir); 
   
};