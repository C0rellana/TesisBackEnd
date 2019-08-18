import model from '../models';
const { Archivo,Ramo,Usuario} = model;
var path = require('path')
const Dropbox = require('../services/Dropbox');
const TOKEN = 'iBumdY95utkAAAAAAAAA-sl12H42Sl7_bXiZTTtNjNx5zZmmCigSMLt7JgPojSkF';
const Sequelize = require('sequelize');
class Archivos {

    static Subir(req, res) {

        const { cod_ramo,cod_categoria,descripcion} = req.body
        var cod_usuario=req.user.id;

        for (let i = 0; i < req.files.length; i++) {

            var file = req.files[i];
            var extension= path.extname(file.originalname);
            var filename = path.basename(file.originalname,extension);
            var enlace= filename + Date.now() +extension;
            
            var archivo = {
                nombre:filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase(),
                enlace:enlace,
                cod_ramo,
                cod_usuario,
                año: new Date().getFullYear(),
                formato:extension.substring(1).toUpperCase(),
                valoracion:0,
                cod_categoria,
                descripcion,
                status: true,
            }

            Dropbox.DropboxUpload(TOKEN,enlace,file.buffer);
            Archivo.create(archivo);

        }  
        res.status(200).send();

  
    }

    static GetAll(req, res) {

          return Archivo
          .findAll({      
            include: [
                {
                    model: Ramo,
                    required: false,
                    attributes: ['nombre'],
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

    static GetArchivo(req, res) {
       return Dropbox.GetFile(TOKEN,req.body.nombre)
                .then(url=>{
                    res.send(url)
                });        
    }
}

export default Archivos;