const model = require('../models')
const { Carrera ,Ramo,Contenido,Usuario } = model;

class Carreras {
  static Crear(req, res) {
    const { nombre, sigla} = req.body
      return Carrera
        .create({
            nombre,
            sigla,
        })
        .then(Carrera => res.status(201).send({
          success: true,
          message: 'Se ha creado correctamente',
          Carrera
        }))
        .catch(error => res.status(400).send(error));
  
  }

  static List(req, res) {
   // console.log(req.user.id)
    return Carrera
      .findAll({
        order: [
          ['nombre', 'ASC']                  
          ],
      })
      .then(Carrera => res.status(200).send(Carrera));
  }

  static ApiGetCarrera(req, res) {
     return Carrera
       .findOne({
        attributes: [['id', 'value'], ['nombre', 'label']],
         include:[
           {
             model:Usuario,
             attributes: [],
             where:{id: req.user.id}
           },         
          ]
       })
       .then(Carrera => res.status(200).send(Carrera));
   }
  
  static CarreraRamos(req, res) {
    return Carrera
      .findAll({
        attributes: [['id', 'value'], ['nombre', 'label'],'sigla'],
        order: [
          ['nombre', 'ASC'],
          [model.Ramo, 'nombre', 'asc'],              
          ],
        include: [{
          model: Ramo,
          required: false,
          attributes: [['id', 'value'], ['nombre', 'label'],'codigo'],  
          include: [{
            model: Contenido,
            required: false,
            attributes: [['id', 'value'], ['nombre', 'label']],
          }]
        }]
      })
      .then(
        data => res.status(200).send(data));
  }

  static CarreraToken(req, res) {
    var cod_carrera=req.user.cod_carrera;
    const token = req.body.token
    
      return Carrera
        .update(
          {token:token},
          {where:{id:cod_carrera}}
        )
        .then(() => res.status(201).send({
          success: true,
          message: 'Se ha modificado correctamente',
        }))
        .catch(error => {
          res.status(400).send(error)
        });

  }

  //verifica el token.
  static IsEnabled(req, res){
    var cod_carrera=req.user.cod_carrera;
    return  Carrera.findByPk(cod_carrera)
      .then(carrera=>{
      
        if(carrera.token){
          return res.send(true)
        }
        else{
         return  res.send(false)
        }
      })

    res.send(false)

  }
}

module.exports = Carreras
