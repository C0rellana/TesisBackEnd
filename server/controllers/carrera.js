const model = require('../models')

const resp = require('./response');
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
      .findAll()
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
}

module.exports = Carreras
