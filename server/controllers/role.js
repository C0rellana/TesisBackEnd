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
        var cod_usuario= req.user.id;
        var role= req.body.role;
        return Usuario.findByPk(cod_usuario).then(user=>{

            return Usuario.findAll({
                where:{role:role, cod_carrera:user.cod_carrera},
                attributes: ['id','rut','nombre'],
                include:[
                    {
                      model:Carrera,
                      attributes: [['id','value'],['nombre','label']],
                    }
                ]     
            
            })
            .then(usuario=>res.status(200).send(usuario));
        })
   
        
    }
    

    static Edit(req, res) {
        var {rut,role,carrera} = req.body;
        var cod_usuario = req.user.id;

        var object={
            role:role,
            cod_carrera:carrera,
        }
        object= clean(object)
        return Usuario.findByPk(cod_usuario).then(us=>{
            Usuario.findOne({where:{rut:rut,cod_carrera:us.cod_carrera}}).then(u=>{
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
        });
                
         

          

     }




}

module.exports = Role
