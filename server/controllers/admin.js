const resp = require('./response');
const fs = require('fs');
const model = require('../models')
const { Admin} = model;


async function ChangeLogo(req, res){
    
    var file= req.file;
    var url= "./server/logo/logo.png"
    fs.writeFile(url, file.buffer, function(err) {
        if(err) {
            return resp.Error(res,'Oops... No se pudo cambiar la imagen')
        }	
        return resp.Success(res,'Archivo subido con exito')
    }); 
};

async function GetLogo(req, res){

    var url= "./server/logo/logo.png"

    fs.readFile(url, function read(err, data) {
        if (err) {
            resp.Error(res)
        }
        else{
            resp.Success(res,"Imagen",data)
        }
    });

};

function getMensaje(req,res){
    Admin.findAll({
        limit: 1,
        where: {
            estado:true
          //your where conditions, or without them if you need ANY entry
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then((data)=>{
        res.send(data)
      }); 
}

function changeMensaje(req,res){
    var {mensaje,tipo,estado}=req.body;
    if(estado){
        Admin.create({mensaje,estado,tipo}).then(data=>{
            res.send(data)
        })
    }
    else{
        Admin.update({estado},{ where: { estado: true }}).then(data=>{
            res.send(data)
        })
    }
   
}


module.exports = {

	ChangeLogo,
    GetLogo,
    changeMensaje,
    getMensaje

}