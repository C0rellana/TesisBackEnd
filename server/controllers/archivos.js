import model from '../models';
const resp = require('./response');
const { Archivo} = model;


class Archivos {

    static Subir(req, res) {
        const { files,cod_ramo,formato,cod_categoria,cod_usuario,descripcion} = req.body
        

        for (let i = 0; i < files.length; i++) {

            const file = files[i];
            var archivo = {
                nombre:file.path,
                cod_ramo,
                cod_usuario,
                año: new Date(),
                formato:formato,
                valoracion:0,
                cod_categoria,
                descripcion,
                status: true,
            }
            console.log(archivo)
         
             Archivo.create(archivo);
       
        }
        res.status(200).send();

  
    }
}

export default Archivos;