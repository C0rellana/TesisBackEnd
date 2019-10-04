const model = require('../models')
const IncomingForm = require("formidable").IncomingForm;

const { Archivo,Ramo,Usuario,Categoria,Contenido,Carrera,Denuncia} = model;
var path = require('path')
const Dropbox = require('../services/Dropbox');
const GoogleDrive = require('../services/GoogleDrive');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sf = require('streamifier');
var fs = require('fs');


async function GetPath(cod_carrera,cod_contenido,cod_categoria,filename,extension){
     //obtener el nombre de la carrera

    const carrera = await Carrera.findByPk(cod_carrera);
    //obtener el nombre del ramo y contenido
    const ramo = await Contenido.findAll({
        where:{id:cod_contenido},
        attributes: ['nombre'],
        include:[
            {
                model: Ramo,
                required: true,
                attributes: ['nombre']
            }, 
        ]
    })
    const categoria = await Categoria.findAll({
        where:{id:cod_categoria},
        attributes: ['nombre'],
    })
 
    var nombre_carrera=carrera.nombre;
    var nombre_ramo= ramo[0].Ramo.nombre;
    var nombre_contenido= ramo[0].nombre;
    var nombre_categoria =categoria[0].nombre;

    return nombre_carrera+'/'+nombre_ramo+'/'+nombre_contenido+'/'+nombre_categoria+'/'+filename+ Date.now()+extension ;


}
async function uploadGOOGLE(file,cod_contenido,cod_usuario,cod_categoria,descripcion,correo,token,carpeta_id){
  
    var extension= path.extname(file.name);
    var filename = path.basename(file.name,extension);
    var nombre_archivo=filename+ Date.now()+extension;
    var buffer = fs.readFileSync(file.path);
    var new_archivo= sf.createReadStream(buffer);
   
   return GoogleDrive.DriveUpload(correo,token,nombre_archivo,carpeta_id,new_archivo,file.type).then(data=>{
         var archivo = {
            nombre:filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase(),
            enlace:data.data,//id del archivo
            cod_contenido,
            cod_usuario,
            año: new Date().getFullYear(),
            formato:extension.substring(1).toUpperCase(),
            valoracion:0.0,
            cod_categoria,
            descripcion,
            estado: true,
            isEnlace:false,
            size: file.size,
        }
        return Archivo.create(archivo)
            .then((resp)=>{return true})
            .catch((err)=>{return false})
    });
}
async function uploadDROPBOX(file,cod_contenido,cod_usuario,cod_categoria,descripcion,token,cod_carrera){
    var extension= path.extname(file.name);
    var filename = path.basename(file.name,extension);
    var url= await GetPath(cod_carrera,cod_contenido,cod_categoria,filename,extension);
    var buffer = fs.readFileSync(file.path);

    return Dropbox.DropboxUpload(token,url,buffer).then(data=>{
        console.log(data)
     
        var archivo = {
           nombre:filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase(),
           enlace:url,//id del archivo
           cod_contenido,
           cod_usuario,
           año: new Date().getFullYear(),
           formato:extension.substring(1).toUpperCase(),
           valoracion:0.0,
           cod_categoria,
           descripcion,
           estado: true,
           isEnlace:false,
           size: file.size,
       }
       
       return Archivo.create(archivo)
           .then(()=>{
               return true
            })
           .catch(()=>{ 
            return false})
           

   });
}
async function uploadEnlace(cod_contenido,cod_usuario,cod_categoria,descripcion,enlace){
 
    var archivo = {
        nombre:enlace.nombre,
        enlace:enlace.enlace,
        cod_contenido,
        cod_usuario,
        año: new Date().getFullYear(),
        formato:"URL",
        valoracion:0.0,
        cod_categoria,
        descripcion,
        status: true,
        isEnlace:true,
    } 
    return await Archivo.create(archivo)
    .then(()=>{return true})
    .catch((error)=>{return false})
   
}
function clean(obj) {
    for (var atr in obj) { 
        if (obj[atr] === null || obj[atr] === undefined || obj[atr] === '') {
        delete obj[atr];
        }
    }
    return obj
}

class Archivos {

    static async Subir(req, res) {
        var cod_carrera= req.user.cod_carrera;
        const { cod_categoria,descripcion,cod_contenido,enlace} = req.body
        var cod_usuario=req.user.id;
        let responses = [];
        //si la entrada son enlaces:          
        if(enlace==='true'){

            var enlaces=JSON.parse(req.body.enlaces)
            for (let i = 0; i < enlaces.length; i++) {
                var s= await  uploadEnlace(cod_contenido,cod_usuario,cod_categoria,descripcion,enlaces[i])
                    .then(()=>{return true})
                    .catch(()=>{return false})  

                responses.push(s)
            }
            res.send(responses)
        }
        else{  

            return Carrera.findByPk(cod_carrera)
            .then(async data=>{
              
                var ubicacion = data.ubicacion;
                var token = data.token;
                var correo=data.correo;
                var carpeta_id=data.carpeta_id;
                for (let i = 0; i < req.files.length; i++) {
                    var file=req.files[i];
                    if(ubicacion==="GOOGLE"){
                        var s= await uploadGOOGLE(file,cod_contenido,cod_usuario,cod_categoria,descripcion,correo,token,carpeta_id)
                            .then(()=>{return true})
                            .catch(()=>{return false})   
                    }
                    if(ubicacion==="DROPBOX"){
                        var s= await uploadDROPBOX(file,cod_contenido,cod_usuario,cod_categoria,descripcion,token,cod_carrera)
                            .then(()=>{return true})
                            .catch(()=>{return false})  
                    }
                    responses.push(s)
                }
                res.send(responses)
            }).catch(err=>{
                res.send(false)
            });
        }
    
       
    }
    static Subir2(req, res) {
        var form = new IncomingForm();

      
      
       
        form.parse(req, async function (err, fields, files) {
            var cod_carrera= req.user.cod_carrera;
            var cod_usuario=req.user.id;
            const { cod_categoria,descripcion,cod_contenido,isEnlace,enlace} = fields
           
            if(isEnlace==='true'){
                uploadEnlace(cod_contenido,cod_usuario,cod_categoria,descripcion,JSON.parse(enlace))
                .then(()=>{res.send(true)})
                .catch(()=>{res.send(false)})   

            }
            else{  
         
                return Carrera.findByPk(cod_carrera)
                .then(data=>{
                    var ubicacion = data.ubicacion;
                    var token = data.token;
                    var correo=data.correo;
                    var carpeta_id=data.carpeta_id;     
                    var file=files.file
                   
                    if(ubicacion==="GOOGLE"){
        
                       uploadGOOGLE(file,cod_contenido,cod_usuario,cod_categoria,descripcion,correo,token,carpeta_id)
                            .then((resp)=>{ 
                                res.send(resp)
                                
                            }).catch(()=>{
                                res.send(false)  
                            })
                            
                    }
                    if(ubicacion==="DROPBOX"){
                       uploadDROPBOX(file,cod_contenido,cod_usuario,cod_categoria,descripcion,token,cod_carrera)
                        .then((resp)=>{ 
                            res.send(resp)
                        }).catch(()=>{
                            res.send(false)  
                        })
                    }  
                });
            }

        });       
    }  
 
    static async GetArchivo(req, res) {
        var nombreArchivo= req.body.nombre;
        var idArchivo= req.body.id;
       return Archivo.findOne(
                {where:{id:idArchivo},
                include:[ {
                    model: Usuario,
                    required: true,
                    attributes: ['cod_carrera'],
                    include:[ {
                        model: Carrera,
                        required: true,
                        attributes: ['ubicacion','token','correo','nombre'],
                    }]
                }]
            }).then(async archivo=>{
                
                    var ubicacion = archivo.Usuario.Carrera.ubicacion;
                    var token = archivo.Usuario.Carrera.token;
                    var correo=archivo.Usuario.Carrera.correo;
                    
                    if(ubicacion==="GOOGLE"){
                    
                        await  GoogleDrive.GetFile(correo,token,nombreArchivo).then(data=>{
                            res.send({url:data.data.webContentLink,success:true});  
                        }).catch((e)=>{
                           
                            res.send({message:"Contenido no encontrado",success:false});  
                        });
                    }
                    if(ubicacion==="DROPBOX"){
                        await Dropbox.GetFile(token,nombreArchivo).then(data=>{
                            return res.send({url:data.link,success:true});  
                        }).catch(()=>{
                            return res.send({message:"Contenido no encontrado",success:false});  
                        });
                    }
                });
           
      
    }

    static GetAll(req, res) {

        return Archivo
        .findAll({
          limit: 100,
          where:{estado:true},
          order: [
              ['valoracion', 'DESC'],
            ],
          include: [
              {
                  model: Contenido,
                  required: false,
                  attributes: ['id','nombre'],
                  include: [
                      {
                          model: Ramo,
                          required: false,
                          attributes: [['nombre','label'],'codigo'],
                      }]
              },
              {
                  model: Categoria,
                  required: false,
                  attributes: ['id','nombre','color'],
              },
              {
                  model: Usuario,
                  required: false,
                  attributes: ['nombre'],
              }
          ]
        })
        .then(
          data => res.status(200).send(data));    
    }

    static misArchivos(req, res) {
        var user_id= req.user.id;
        return Archivo
        .findAll({
          limit: 100,
          where:{estado:true,cod_usuario:user_id},
          include: [
              {
                  model: Contenido,
                  required: false,
                  attributes: [['id','value'],['nombre','label']],
                  include: [
                      {
                          model: Ramo,
                          required: false,
                          attributes: [['id','value'],['nombre','label']],
                      }]
              },
              {
                  model: Categoria,
                  required: false,
                  attributes: [['id','value'],['nombre','label']],
              },
          ]
        })
        .then(data => {
          res.status(200).send(data)
          });    
    }

    static EditArchivo(req,res){
        var {archivo_id,cod_contenido,cod_categoria,descripcion,nombre} = req.body;
        var object={
            cod_contenido:cod_contenido,
            cod_categoria:cod_categoria,
            descripcion:descripcion,
            nombre:nombre,
        }
        object= clean(object)
            return Archivo
            .update(object,{ where: { id: archivo_id } })
            .then(Archivo => res.status(200).send({status: true,data:Archivo, message:"Archivo editado"}))
            .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
       

    }
    
    static DeleteArchivo(req,res){
        var {archivo_id} = req.body;
        return Archivo
        .update({ estado: false},{ where: { id: archivo_id } })
        .then(Archivo => res.status(200).send({status: true,data:Archivo, message:"Archivo Eliminado"}))
        .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))

    }

    static async FilterArchivos(req, res) {
        const {carreras,ramos,contenidos,busqueda} = req.body;

       var FiltroCRC= {};
        if(carreras.length>0){
            if(ramos.length>0){
                if(contenidos.length>0){
                    FiltroCRC = {
                                model: Contenido,
                                required: true,
                                attributes: ['id','nombre'],
                                where:{id:contenidos},
                                include: [
                                    {
                                        model: Ramo,
                                        required: true,
                                        attributes: [['nombre','label'],'codigo'],
                                        where:{id:ramos},
                                        include: [
                                            {
                                                model: Carrera,
                                                required: true,
                                                attributes: [['nombre','label']],  
                                                where:{id:carreras},                                
                                            }]
                                    }]
                            }   
                }
                else{
                    FiltroCRC = {
                        model: Contenido,
                        required: true,
                        attributes: ['id','nombre'],
                        include: [
                            {
                                model: Ramo,
                                required: true,
                                attributes: [['nombre','label'],'codigo'],
                                where:{id:ramos},
                                include: [
                                    {
                                        model: Carrera,
                                        required: true,
                                        attributes: [['nombre','label']],  
                                        where:{id:carreras},                             
                                    }]
                            }]
                    }   

                }
            }
            else{
                FiltroCRC = {
                    model: Contenido,
                    required: true,
                    attributes: ['id','nombre'],
                    include: [
                        {
                            model: Ramo,
                            required: true,
                            attributes: [['nombre','label'],'codigo'],
                            include: [
                                {
                                    model: Carrera,
                                    required: true,
                                    attributes: [['nombre','label']], 
                                    where:{id:carreras},                               
                                }]
                        }]
                }   

            }
        }
        else{
       
            FiltroCRC = {
            
                model: Contenido,
                required: true,
                attributes: ['id','nombre'],
                include: [
                    {
                        model: Ramo,
                        required: true,
                        attributes: [['nombre','label'],'codigo'],
                        include: [
                            {
                                model: Carrera,
                                required: true,
                                attributes: [['nombre','label']],                               
                            }]
                    }]
            }   

        }


        return Archivo
        .findAll({
            where: { 
                estado:true,
                [Op.or]:{
                        nombre: { [Op.like]: '%' + busqueda + '%' },
                        descripcion: { [Op.like]: '%' + busqueda + '%' } 
                        }
                },
            order: [
                ['valoracion', 'DESC'],
                [model.Categoria, 'nombre', 'asc']
                
                ],
            include: [
                FiltroCRC,
                {
                    model: Categoria,
                    required: false,
                    attributes: ['id','nombre','color'],
                },
                {
                    model: Usuario,
                    required: true,
                    attributes: ['nombre'],
                }
               
          ],
          limit: 200,
        })
        .then(
          data => {
            res.status(200).send(data)
          }
          );    
    }

    static ValorarArchivo(req, res) {
        const { archivo,value} = req.body;
        var mivaloracion= '((valoracion + '+value+')/2.0)' 
        return  Archivo.update({ valoracion: Sequelize.literal(mivaloracion) }, { where: { id: archivo } })
        .then(()=>{
            return res.status(200).send({status: true, message:"Valoración enviada"})  
        })
        .catch(()=>{       
           return res.status(200).send({status: false, message:"Valoración enviada"}) 
        })     
            
    }
    
    static DenunciarArchivo(req, res) {
        const {descripcion, archivo,tipo} = req.body;

        var denuncia = {
            descripcion:descripcion,
            cod_archivo: archivo,
            cod_usuario: req.user.id,
            cod_tipodenuncia: tipo,
        }
    
        return  Denuncia.create(denuncia)
        .then(()=>{
          
            return res.status(200).send({status: true, message:"Denuncia enviada"})  
        })
        .catch((error)=>{      
           return res.status(200).send({status: false, message:"Denuncia enviada"}) 
        })     
            
    }
}

module.exports = Archivos
