import model from '../models';
const { Categoria,Carrera} = model;


class Categorias {

    static List(req, res) {
        const cod_carrera =  req.params.id;
        return Categoria
        .findAll({
            attributes: [['id', 'value'], ['nombre', 'label'],'icon'],
            include: [{model:Carrera, as:'CategoriaCarreras',attributes: [], where:{id:cod_carrera}}]
        })
        .then(Categorias => res.status(200).send(Categorias));
    }
}

export default Categorias;