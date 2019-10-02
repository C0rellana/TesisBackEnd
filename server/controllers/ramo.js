const model = require('../models')
const { Ramo,Usuario,Contenido } = model;

function clean(obj) {
    for (var atr in obj) { 
        if (obj[atr] === null || obj[atr] === undefined || obj[atr] === '') {
        delete obj[atr];
        }
    }
    return obj
}

class Ramos {

    static List(req, res) {
        var cod_carrera= req.user.cod_carrera;
            return Ramo
            .findAll({
                attributes: ['id','nombre','codigo'],
                where: {cod_carrera:cod_carrera},
                order: [
                    ['nombre', 'ASC']                  
                    ],
                include: [
                    {
                        model: Contenido,
                        required: false,
                        attributes: ['id','nombre','unidad'],
                    }]
            })
            .then(Ramos => res.status(200).send(Ramos));
    }
    
    static NuevoRamo(req, res) {
       var {nombre,codigo} = req.body;
       var cod_carrera= req.user.cod_carrera;
       
            return Ramo
            .create({
                nombre:nombre,
                codigo:codigo,
                cod_carrera:cod_carrera
            })
            .then(Ramos => res.status(200).send({status: true,data:Ramos, message:"Ramo agregado"}))
            .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
      
    }

    static EditRamo(req, res) {
        var {nombre,codigo,id} = req.body;
        console.log(req.body)

        var object={
            nombre:nombre,
            codigo:codigo,
        }
        object= clean(object)

             return Ramo
             .update(object,{ where: { id: id } })
             .then(Ramos => res.status(200).send({status: true,data:Ramos, message:"Ramo editado"}))
             .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
    }

    static DeleteRamo(req, res) {
        var {id} = req.body;
 
        return Ramo
            .destroy({ where: { id: id } })
            .then(Ramos => res.status(200).send({status: true,data:Ramos, message:"Ramo Eliminado"}))
            .catch(()=>res.status(200).send({status: false, message:"No se pudo completar la acción"}))
    
    }

    static RamosbyCarrera(req, res) {
        var cod_carrera= req.user.cod_carrera;
            return Ramo
            .findAll({
                attributes: [['id', 'value'], ['nombre', 'label'],'codigo'],
                where: {cod_carrera:cod_carrera},
                order: [
                    ['nombre', 'ASC']                  
                    ],
                include: [
                    {
                        model: Contenido,
                        required: false,
                        attributes: [['id', 'value'], ['nombre', 'label'],'unidad'],
                        
                    }]
            })
            .then(Ramos => res.status(200).send(Ramos));
     
    }
}

module.exports = Ramos
