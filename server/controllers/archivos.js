import model from '../models';
const { Archivo,Ramo,Usuario,Categoria,Contenido,Carrera} = model;
var path = require('path')
const Dropbox = require('../services/Dropbox');
const TOKEN = 'iBumdY95utkAAAAAAAAA-sl12H42Sl7_bXiZTTtNjNx5zZmmCigSMLt7JgPojSkF';
const Sequelize = require('sequelize');
class Archivos {

    static Subir(req, res) {

        const { cod_categoria,descripcion,cod_contenido,enlace} = req.body
        var cod_usuario=req.user.id;

        //si la entrada son enlaces:    
        
        if(enlace==='true'){
            var enlaces=JSON.parse(req.body.enlaces)
            for (let i = 0; i < enlaces.length; i++) {
                var archivo = {
                    nombre:enlaces[i].nombre,
                    enlace:enlaces[i].enlace,
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
                Archivo.create(archivo);
            }
            res.status(200).send({message:"Enlaces subidos"});
        }
        else{
            for (let i = 0; i < req.files.length; i++) {
               
                var file = req.files[i];
                var extension= path.extname(file.originalname);
                var filename = path.basename(file.originalname,extension);
                var url= filename + Date.now() +extension;
                
                var archivo = {
                    nombre:filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase(),
                    enlace:url,
                    cod_contenido,
                    cod_usuario,
                    año: new Date().getFullYear(),
                    formato:extension.substring(1).toUpperCase(),
                    valoracion:0.0,
                    cod_categoria,
                    descripcion,
                    status: true,
                    isEnlace:false,
                }
                Dropbox.DropboxUpload(TOKEN,url,file.buffer);
                Archivo.create(archivo);
            }  
            res.status(200).send({message:"Archivos subidos"});
        }
    }

    static GetAll(req, res) {

          return Archivo
          .findAll({
            limit: 15,
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



    static async GetArchivo(req, res) {
       const url = await Dropbox.GetFile(TOKEN, req.body.nombre);
        res.send(url);        
    }


    static async FilterArchivos(req, res) {
        const {carreras , ramos, contenidos} = req.body;

       var Filtro= {};
        if(carreras.length>0){
            if(ramos.length>0){
                if(contenidos.length>0){
                    Filtro = {
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
                    Filtro = {
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
                Filtro = {
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
            Filtro = {
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



   // console.log(Filtro)
    
       

        return Archivo
        .findAll({
            order: [
                [model.Categoria, 'nombre', 'asc']
                ],
            include: [
                Filtro,
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
}

export default Archivos;