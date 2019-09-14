const model = require('../models')
const { Contenido } = model;

function clean(obj) {
    for (var atr in obj) { 
        if (obj[atr] === null || obj[atr] === undefined || obj[atr] === '') {
        delete obj[atr];
        }
    }
    return obj
}

class Contenidos {

    static List(req, res) {
        var ramoid =req.body.id;
            return Contenido
            .findAll({
                attributes: ['id','nombre','unidad'],
                where: {cod_ramo:ramoid},
            })
            .then(Contenidos => res.status(200).send(Contenidos));
    }
    
    static NewContenido(req, res) {
        var {ramoid,nombre,unidad} =req.body;
        return Contenido
        .create({
            nombre:nombre,
            unidad:unidad,
            cod_ramo:ramoid
        })
        .then(Contenido =>{
             res.status(200).send({status: true,data:Contenido, message:"Contenido agregado"})
        })
        .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
    }

    static EditContenido(req, res) {
       var {id,nombre,unidad} =req.body;

        var object={
            nombre:nombre,
            unidad:parseInt(unidad),
        }
        object= clean(object)
            return Contenido
            .update(object,{ where: { id: id } })
            .then(Contenido => res.status(200).send({status: true,data:Contenido, message:"Contenido editado"}))
            .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))

     }
     static DeleteContenido(req, res) {
        var {id} = req.body;
        return Contenido
            .destroy({ where: { id: id } })
            .then(Contenido => res.status(200).send({status: true,data:Contenido, message:"Contenido eliminado"}))
            .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
    
     }

}

module.exports = Contenidos
