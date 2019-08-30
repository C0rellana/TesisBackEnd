const model = require('../models')
const { Denuncia,Usuario,Archivo,Tipodenuncia,Contenido,Ramo } = model;


class Denuncias {

    static List(req, res) {
      
        Archivo
            .findAll({
                attributes: ['id','nombre','descripcion'],
                where:{estado:true},
               
                include: [
                    {
                        model: Denuncia,
                        required: true,
                        attributes: ['descripcion'],
                        where:{estado:true},
                        include: [
                            {
                                model: Tipodenuncia,
                                required: true,
                                attributes: ['nombre'],
                                
                            }] 
                    },
                    {
                        model: Usuario,
                        required: true,
                        attributes: ['nombre','rut'],
                        
                    },
                    {
                        model: Contenido,
                        required: true,
                        attributes: ['nombre'],
                        include:[
                            {  model: Ramo,
                                required: true,
                                attributes: ['id','nombre','cod_carrera'],  
                                where:{cod_carrera:1},

                            }
                        ]        
                    }]
            })
            .then(data=>{
                res.send(data)
            });
        
    }

    static AceptarDenuncia(req,res){
        var id_archivo = 5;

        return  Archivo.update({ estado: false}, { where: { id: id_archivo } })
        .then(()=>{
           return  Denuncia.update({ estado: false}, { where: { cod_archivo: id_archivo } }).then(() =>{

                return res.status(200).send({status: true, message:"Archivo Eliminado"});  

        })
        .catch(()=>{       
            return res.status(200).send({status: false, message:"No se pudo completar la accion"}) 
         })  
           
        })
        .catch(()=>{       
           return res.status(200).send({status: false, message:"No se pudo completar la accion"}) 
        })   

    }

    static IgnorarDenuncia(req,res){
        var id_archivo = 4;

        return  Denuncia.update({ estado: false}, { where: { cod_archivo: id_archivo } }).then(() =>{

            return res.status(200).send({status: true, message:"Denuncias eliminadas"});  

        }).catch(()=>{
            return res.status(200).send({status: false, message:"No se pudo ignorar la denuncia"});  
        })
           
      
    }
    
}

module.exports = Denuncias
