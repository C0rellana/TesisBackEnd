import model from '../models';
const { Ramo,Usuario } = model;


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
                attributes: [['id', 'value'], ['nombre', 'label']],
                where: {cod_carrera:usuario.cod_carrera}})
            .then(Ramos => res.status(200).send(Ramos));
        });
     }
}

export default Ramos;