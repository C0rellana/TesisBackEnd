const model = require('../models')
const {Log,Usuario,Carrera,Ramo,Contenido} = model;

//por id
async function GetCarrera(cod_usuario){
    //obtener el nombre de la carrera
   const user = await Usuario.findAll({
       where:{id:cod_usuario},
       attributes: [],
       include:[
           {
               model: Carrera,
               required: true,
               attributes: ['id','nombre']
           }, 
       ]
   })
   .map(el => el.get({ plain: true }))
   
   return user.length>0?user[0].Carrera:null;
}
//por correo
async function GetCarrera2(correo){
    //obtener el nombre de la carrera
   const user = await Usuario.findAll({
       where:{correo:correo},
       attributes: [],
       include:[
           {
               model: Carrera,
               required: true,
               attributes: ['id','nombre']
           }, 
       ]
   })
   .map(el => el.get({ plain: true }))
 
   return user.length>0?user[0].Carrera:null;

}

const general = async (req, res, next) => {
    var carrera= null;
    var url=req.url.substring(1).toUpperCase();
    if(req.user){
       carrera =  await GetCarrera(req.user.id);
    }
    if(url==='LOGIN'){
        carrera =  await GetCarrera2(req.body.correo);
    }
    var object={
        ip:req.connection.remoteAddress,
        navegador:req.device.type.toUpperCase(),
        accion:url,
        metodo:req.method, 
        user:req.user?req.user.id:null,
        user_carrera_id:carrera?carrera.id:null,
        user_carrera_nombre:carrera?carrera.nombre:null,
        date:new Date(),
    }
     await Log.create(object);


next();
}

const buscar = async (req, res, next) => {
        var carreras=req.body.carreras;
        var ramos = req.body.ramos;
        var contenidos = req.body.contenidos;
        var  carre =  await GetCarrera(req.user.id);
        if(carreras.length>0){
            if(ramos.length>0){
                if(contenidos.length>0){
                   await contenidos.forEach( async contenido => {     
                      await  Contenido.findByPk(contenido).then(async data=>{
                           await Ramo.findByPk(data.cod_ramo).then(async data2=>{
        
                                var object={
                                    ip:req.connection.remoteAddress,
                                    navegador:req.device.type.toUpperCase(),
                                    accion:req.url==="/FilterArchivos"?"BUSCAR":"",
                                    metodo:req.method,
                                    date:new Date(),
                                    user:req.user?req.user.id:null,
                                    user_carrera_id:carre?carre.id:null,
                                    user_carrera_nombre:carre?carre.nombre:null,
                                    busqueda:req.body.busqueda?req.body.busqueda:null,
                                    cod_carrera:data2.cod_carrera,
                                    cod_ramo:data.cod_ramo,
                                    cod_contenido:contenido,
                                }
                               await Log.create(object);
                             })  
                        })
                        
                    });
                }
                else{
                    ramos.forEach(async ramo => {
                        await Ramo.findByPk(ramo).then(async data=>{
                            var object={
                                ip:req.connection.remoteAddress,
                                navegador:req.device.type.toUpperCase(),
                                accion:req.url==="/FilterArchivos"?"BUSCAR":"",
                                metodo:req.method,
                                date:new Date(),
                                user:req.user?req.user.id:null,
                                user_carrera_id:carre?carre.id:null,
                                user_carrera_nombre:carre?carre.nombre:null,
                                busqueda:req.body.busqueda?req.body.busqueda:null,
                                cod_carrera:data.cod_carrera,
                                cod_ramo:ramo,
                                cod_contenido:null,
                            }
                          await  Log.create(object);
                    })
                        
                    });
                }
            }
            else{
                carreras.forEach(async carrera => {
                    var object={
                        ip:req.connection.remoteAddress,
                        navegador:req.device.type.toUpperCase(),
                        accion:req.url==="/FilterArchivos"?"BUSCAR":"",
                        metodo:req.method,
                        date:new Date(),
                        user:req.user?req.user.id:null,
                        user_carrera_id:carre?carre.id:null,
                        user_carrera_nombre:carre?carre.nombre:null,
                        busqueda:req.body.busqueda?req.body.busqueda:null,
                        cod_carrera:carrera,
                        cod_ramo:null,
                        cod_contenido:null,
                    }
                   await Log.create(object);
                
                });

            }
        }
 
    next();
}

const compartir =async (req, res, next) => {
    var  carrera =  await GetCarrera(req.user.id);
    var object={
        ip:req.connection.remoteAddress,
        navegador:req.device.type.toUpperCase(),
        accion:req.url==="/archivos"?"SUBIR":"",
        metodo:req.method,
        date:new Date(),
        user_carrera_id:carrera?carrera.id:null,
        user_carrera_nombre:carrera?carrera.nombre:null,
        user:req.user?req.user.id:null,
        enlace: req.body.enlace,
        descripcion: req.body.descripcion,
        cod_contenido:req.body.cod_contenido,
        cod_categoria:req.body.cod_categoria
    }
    Log.create(object);

next();
}

const Notas = async(req, res, next) => {
    var  carrera =  await GetCarrera(req.user.id);
    var object={
        ip:req.connection.remoteAddress,
        navegador:req.device.type.toUpperCase(),
        accion:req.url==="/notas"?"NOTAS":'',
        user_carrera_id:carrera?carrera.id:null,
        user_carrera_nombre:carrera?carrera.nombre:null,
        metodo:req.method,
        date:new Date(),
        user:req.user?req.user.id:null,
        noda_deseada:req.body.notadeseada,

    }
    Log.create(object);

    next();
}

  
module.exports = {
    buscar,
    compartir,
    general,
    Notas
}