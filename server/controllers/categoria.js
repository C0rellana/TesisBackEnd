const model = require('../models')
const { Categoria,Usuario,Carrera} = model;
const Op = require('sequelize').Op;

function clean(obj) {
    for (var atr in obj) { 
        if (obj[atr] === null || obj[atr] === undefined || obj[atr] === '') {
        delete obj[atr];
        }
    }
    return obj
}


class Categorias {

    static ListAll(req, res) {
        var cod_carrera = req.user.cod_carrera
            return Categoria
            .findAll({
                attributes: [['id', 'value'], ['nombre', 'label'],'icon','color','descripcion'],
                where:{
                    [Op.or]: [{id:[1,2,3,4,5,6,7]}, {cod_carrera: cod_carrera}]
                    },
                  
                order: [
                    ['nombre', 'ASC'],
                ]
            })
            .then(Categorias =>{res.status(200).send(Categorias)} );
    }
    static ListForCarrera(req, res) {
        var cod_carrera = req.user.cod_carrera
            return Categoria
            .findAll({
                attributes: [['id', 'value'], ['nombre', 'label'],'icon','color','descripcion'],
                where:{
                   cod_carrera: cod_carrera
                    },
                  
                order: [
                    ['nombre', 'ASC'],
                ]
            })
            .then(Categorias =>{res.status(200).send(Categorias)} );
    }

    static AgregarCategoria(req, res) {
        var {nombre,descripcion,color,id} = req.body;
        
            var object={
                nombre:nombre,
                descripcion:descripcion,
                color:color?color:"#000",
                cod_carrera:req.user.cod_carrera,
            }
            return  Categoria.create(object)
            .then(()=>{
                return res.status(200).send({status: true, message:"Categoria creada"});  
            })
            .catch((error)=>{
                console.log(error)
                return res.status(200).send({status: false, message:"No se pudo completar la acción"});  
            })

    }

    static EditarCategoria(req, res) {
        var {nombre,descripcion,color,id} = req.body;
        var object={};
      
        object={
            nombre:nombre,
            descripcion:descripcion,
            color:color,
        }
        object= clean(object) //eliminar nulos para actualizar solo lo necesario
  
        return  Categoria.update(object, { where: { id: id } })
        .then(()=>{
           return res.status(200).send({status: true, message:"Categoria actualizadas"});  
        })
        .catch(()=>{
            return res.status(200).send({status: false, message:"No se pudo completar la acción"});  
        })
    }
    static EliminarCategoria(req, res) {
        var {id} = req.body;
        
        return  Categoria.destroy({ where: { id: id } })
        .then(()=>{
           return res.status(200).send({status: true, message:"Categoria eliminada"});  
        })
        .catch(()=>{
            return res.status(200).send({status: false, message:"No se pudo completar la acción"});  
        })
    }
}

module.exports = Categorias;
