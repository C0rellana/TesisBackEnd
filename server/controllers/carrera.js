import model from '../models';

const { Carrera } = model;

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
    return Carrera
      .findAll()
      .then(Carrera => res.status(200).send(Carrera));
  }
}

export default Carreras;