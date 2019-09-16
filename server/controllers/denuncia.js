const model = require('../models')
const { Denuncia,Usuario,Archivo,Tipodenuncia,Contenido,Ramo } = model;


class Denuncias {

    static List(req, res) {
        var estado=req.body.tipo;
        var cod_carrera= req.user.cod_carrera;
      
        Archivo
            .findAll({
                attributes: ['id','nombre','descripcion'],               
                include: [
                    {
                        model: Denuncia,
                        required: true,
                        attributes: ['descripcion'],
                        where:{estado:estado},
                        include: [
                            {
                                model: Tipodenuncia,
                                required: true,
                                attributes: ['nombre'],                                
                            },
                            {
                                model: Usuario,
                                required: true,
                                attributes: ['nombre','rut'],
                                
                            },
                        ] 
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
                                where:{cod_carrera:cod_carrera},

                            }
                        ]        
                    }]
            })
            .then(data=>{
                res.send(data)
            });
        
    }

    static GetTipos(req, res) {
      
        Tipodenuncia
            .findAll({
                attributes: [['id','value'],['nombre','label']],
            })
            .then(data=>{
                res.send(data)
            });
        
    }
    
    static AceptarDenuncia(req,res){
        var id_archivo = req.body.cod_archivo;
        
        return  Archivo.update({ estado: false}, { where: { id: id_archivo } })
        .then(()=>{
           return  Denuncia.update({ estado: 'aceptada'}, { where: { cod_archivo: id_archivo } }).then(() =>{

                return res.status(200).send({status: true, message:"Denuncia Aceptada"});  

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
        var id_archivo = req.body.cod_archivo;

        return  Archivo.update({ estado: true}, { where: { id: id_archivo } })
        .then(()=>{
           return  Denuncia.update({ estado: 'rechazada'}, { where: { cod_archivo: id_archivo } }).then(() =>{

                return res.status(200).send({status: true, message:"Denuncia Ignorada"});  

        })
        .catch((error)=>{   
            console.log(error)   
            return res.status(200).send({status: false, message:"No se pudo completar la accion"}) 
         })  
           
        })
        .catch((error)=>{   
            console.log(error)    
           return res.status(200).send({status: false, message:"No se pudo completar la accion"}) 
        })  
           
      
    }
    
}

module.exports = Denuncias
