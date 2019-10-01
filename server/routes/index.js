
const Carrera = require('../controllers/carrera');
const Role = require('../controllers/role');
const Contenido = require('../controllers/contenido');
const Denuncia = require('../controllers/denuncia');
const Ramo = require('../controllers/ramo');
const Categoria = require('../controllers/categoria');
const Archivos = require('../controllers/archivos');
const Notas = require('../controllers/notas');
const authController = require('../controllers/auth');
const admin = require('../controllers/admin');
var multer  = require('multer')
var upload = multer();
const authMiddleware = require('../middlewares/auth');
const logMiddleware = require('../middlewares/log');
const dashboard = require("../controllers/Dashboard")
module.exports=(app) => {

  app.post('/notas',authMiddleware.checkAuth,logMiddleware.Notas, Notas.List);

  /*Rutas para obtener datos del usuario*/
  app.post('/login',logMiddleware.general, authController.login); //LOGIN
  app.post('/register',logMiddleware.general,authController.register);
  app.post('/restablecer',logMiddleware.general,authController.restablecer);
  app.post('/CambiarContrasena',logMiddleware.general,authController.CambiarContrasena);
  

  app.get('/GetData',authMiddleware.checkAuth,authController.GetData); 
  app.post('/ChangeColor',authMiddleware.checkAuth,logMiddleware.general,authController.ChangeColor); 

  app.post('/Avatar',upload.single('file'),authMiddleware.checkAuth,logMiddleware.general,authController.ChangeAvatar); 
  app.get('/Avatar',authMiddleware.checkAuth,authController.GetAvatar); 

  app.post('/changePreferencias',authMiddleware.checkAuth,authController.changePreferencias); 
  

  /*Rutas para obtener datos de carreras*/
  app.get('/carreras',Carrera.List); 
  app.get('/carreraIsEnabled',authMiddleware.checkAuth,Carrera.IsEnabled); 
  app.get('/ApiGetCarrera',authMiddleware.checkAuth,Carrera.ApiGetCarrera); 
  app.get('/carrerasramos',authMiddleware.checkAuth,Carrera.CarreraRamos); 
  app.post('/CarreraToken',authMiddleware.checkAuth,Carrera.CarreraToken); 
  
  /*Rutas para obtener datos de ramos*/

  app.get('/ramos',authMiddleware.checkAuth,Ramo.RamosbyCarrera); 
  app.get('/ramos2',authMiddleware.checkAuth,Ramo.List); 
  app.post('/nuevoramo',authMiddleware.checkAuth,Ramo.NuevoRamo); 
  app.post('/editramo',authMiddleware.checkAuth,Ramo.EditRamo); 
  app.post('/deleteramo',authMiddleware.checkAuth,Ramo.DeleteRamo); 

  /*Rutas para obtener datos de contenidos*/

  app.post('/Contenidos',authMiddleware.checkAuth,Contenido.List); 
  app.post('/newContenido',authMiddleware.checkAuth,Contenido.NewContenido); 
  app.post('/editContenido',authMiddleware.checkAuth,Contenido.EditContenido); 
  app.post('/deleteContenido',authMiddleware.checkAuth,Contenido.DeleteContenido); 

   /*Rutas para obtener datos de categorias*/
  app.get('/categorias',authMiddleware.checkAuth,Categoria.ListAll); 
  app.get('/miscategorias',authMiddleware.checkAuth,Categoria.ListForCarrera); 
  app.post('/agregarcategoria',authMiddleware.checkAuth,Categoria.AgregarCategoria); 
  app.post('/editarcategoria',authMiddleware.checkAuth,Categoria.EditarCategoria); 
  app.post('/eliminarcategoria',authMiddleware.checkAuth,Categoria.EliminarCategoria); 
  
  /*Rutas para obtener las denuncias*/
  app.post('/denuncias',authMiddleware.checkAuth,Denuncia.List); 
  app.post('/AceptarDenuncia',authMiddleware.checkAuth,Denuncia.AceptarDenuncia); 
  app.post('/ignorarDenuncia',authMiddleware.checkAuth,Denuncia.IgnorarDenuncia); 
  app.post('/DenunciarArchivo',authMiddleware.checkAuth, Archivos.DenunciarArchivo);
  app.get('/GetTipos',authMiddleware.checkAuth,Denuncia.GetTipos); 

  /*Rutas para obtener datos de Archivos*/
  app.post('/archivos',authMiddleware.checkAuth,logMiddleware.compartir, Archivos.Subir2); //LOG COMPARTIR
  app.get('/archivos',authMiddleware.checkAuth, Archivos.GetAll);
  app.get('/misarchivos',authMiddleware.checkAuth, Archivos.misArchivos);
  app.post('/GetArchivo',authMiddleware.checkAuth,logMiddleware.general,Archivos.GetArchivo);
  app.post('/ValorarArchivo',authMiddleware.checkAuth, Archivos.ValorarArchivo);
  app.post('/FilterArchivos',authMiddleware.checkAuth,logMiddleware.buscar, Archivos.FilterArchivos); //LOG BUSCAR
  app.post('/DeleteArchivo',authMiddleware.checkAuth, Archivos.DeleteArchivo);
  app.post('/EditArchivo',authMiddleware.checkAuth, Archivos.EditArchivo);

  /*Rutas para obtener datos de roles*/

  app.post('/roles',authMiddleware.checkAuth,Role.List); 
  app.get('/roleDirector',authMiddleware.checkAuth,Role.ListDirectores); 
  app.post('/editRole',authMiddleware.checkAuth,Role.Edit); 

  /*Cambiar logo ADMIN*/
  app.post('/Logo',upload.single('file'),authMiddleware.checkAuth,admin.ChangeLogo); 
  app.get('/Logo',authMiddleware.checkAuth,admin.GetLogo); 

  app.get('/getMensaje',admin.getMensaje); 
  app.post('/setMensaje',authMiddleware.checkAuth,admin.changeMensaje); 


};

