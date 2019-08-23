const model = require('../models')
const { Ramo,Usuario,Contenido } = model;


class Ramos {

    static List(req, res) {
        return Ramo
        .findAll()
        .then(Ramos => res.status(200).send(Ramos));
    }

    static RamosbyCarrera(req, res) {
        return Usuario.findOne({where:{id:req.user.id}}).then(usuario=>{
            return Ramo
            .findAll({
                attributes: [['id', 'value'], ['nombre', 'label'],'codigo'],
                where: {cod_carrera:usuario.cod_carrera},
                include: [
                    {
                        model: Contenido,
                        required: false,
                        attributes: [['id', 'value'], ['nombre', 'label']],
                    }]
            })
            .then(Ramos => res.status(200).send(Ramos));
        });
     }
}

module.exports = Ramos
