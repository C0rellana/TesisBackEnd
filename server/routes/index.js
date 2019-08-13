
import Carreras from '../controllers/carrera';

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

export default (app) => {

  app.post('/login', authController.login);
  app.post('/register', authController.register);
  

  app.post('/carreras',authMiddleware.checkAuth,Carreras.Crear); 
  app.get('/carreras',authMiddleware.checkAuth,Carreras.List); 

};