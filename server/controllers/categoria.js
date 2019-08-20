import model from '../models';
const { Categoria,Usuario,Carrera} = model;


class Categorias {

    static List(req, res) {
       return Usuario.findOne({where:{id:req.user.id}}).then(usuario=>{
            return Categoria
            .findAll({
                attributes: [['id', 'value'], ['nombre', 'label'],'icon','color'],
                order: [
                    ['nombre', 'ASC'],
                ],
                include: [{model:Carrera, as:'CategoriaCarreras',attributes: [], where:{id:usuario.cod_carrera}}]
            })
            .then(Categorias => res.status(200).send(Categorias));
       });
    }
}

export default Categorias;