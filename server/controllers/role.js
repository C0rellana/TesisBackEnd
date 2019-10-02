const model = require('../models')
const { Usuario,Carrera } = model;

function clean(obj) {
    for (var atr in obj) { 
        if (obj[atr] === null || obj[atr] === undefined || obj[atr] === '') {
        delete obj[atr];
        }
    }
    return obj
}

class Role {
    
    static List(req, res) {
        var cod_carrera= req.user.cod_carrera;
        var role= req.body.role;
            return Usuario.findAll({
                where:{role:role, cod_carrera:cod_carrera},
                attributes: ['id','rut','nombre'],
                include:[
                    {
                      model:Carrera,
                      attributes: [['id','value'],['nombre','label']],
                    }
                ]     
            
            })
            .then(usuario=>res.status(200).send(usuario));
   
        
    }
    static ListDirectores(req, res) {

            return Usuario.findAll({
                where:{role:"DIRECTOR"},
                attributes: ['id','rut','nombre'],
                include:[
                    {
                      model:Carrera,
                      attributes: [['id','value'],['nombre','label']],
                    }
                ]     
            
            })
            .then(usuario=>res.status(200).send(usuario));
   
        
    }
    

    static Edit(req, res) {
        var {rut,role,carrera} = req.body;
        var cod_carrera= req.user.cod_carrera;
        if(!carrera){carrera=cod_carrera}
        
        var object={
            role:role,
            cod_carrera:carrera,
        }
        object= clean(object)
            Usuario.findOne({where:{rut:rut,cod_carrera:carrera}}).then(u=>{
                if(u){
                return  Usuario.update(object,{where:{rut:rut}})
                    .then(user=> {
                        return res.status(200).send({status: true,data:user, message:"Rol editado"})
                    })
                    .catch(err =>{
                        return res.status(200).send({status: false,data:err, message:"No se pudo completar la acción"})
                    })
                }
                else{
                    return res.status(200).send({status: false, message:"No se ha encontrado el usuario"})
                
                }
            })
                
         

          

     }




}

module.exports = Role
