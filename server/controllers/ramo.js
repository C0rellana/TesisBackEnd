import model from '../models';
const { Ramo } = model;


class Ramos {

    static List(req, res) {
        return Ramo
        .findAll()
        .then(Ramos => res.status(200).send(Ramos));
    }
    static RamosbyCarrera(req, res) {
        const cod_carrera =  req.params.id;
        return Ramo
        .findAll({
            attributes: [['id', 'value'], ['nombre', 'label']],
            where: {cod_carrera}})
        .then(Ramos => res.status(200).send(Ramos));
    }
}

export default Ramos;