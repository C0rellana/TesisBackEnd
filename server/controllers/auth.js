const config =  require('../services/config');
const bcrypt = require('bcrypt');
const authService = require('../services/auth');
const Usuarios = require('../models').Usuario;
const resp = require('./response');
const Op = require('sequelize').Op;
const addUser = user => Usuarios.create(user);
const fs = require('fs');

function login(req, res){
	return authService.authenticate(req.body)
	.then(data => {
		return	resp.Success(res,"Ha iniciado session correctamente",data)
	})
	.catch(err => {
		if (err.type === 'custom'){
			return resp.Error(res,err.message)
		}
		return resp.Error(res,'Oops... Error desconocido.')
	})
};

function GetData(req, res){
	const id = req.user.id;
	return Usuarios.findOne({ 
		attributes: ['id','cod_carrera','role','nombre','preferencias','color','rut','img'],
		where: {id: id}
	})
	.then(usuario => res.status(200).send(usuario));
};

function ChangeColor(req, res){
	const id = req.user.id;
	return Usuarios.update(
		{color: req.body.color},
		{ where: { id: id } }
	  )
	.then(usuario => res.status(200).send(usuario));
};
function changePreferencias(req, res){
	const id = req.user.id;
	return Usuarios.update(
		{preferencias: JSON.stringify(req.body.preferencias)},
		{ where: { id: id } }
	  )
	.then(usuario => res.status(200).send(usuario));
};

async function ChangeAvatar(req, res){
	const id = req.user.id;
	var file= req.file;
	const user = await Usuarios.findAll({
        where:{id:id},
        attributes: ['rut'],
    })
	.map(el => el.get({ plain: true }))
	var url= "./server/avatars/"+user[0].rut+".png"
	fs.writeFile(url, file.buffer, function(err) {
		if(err) {
			return resp.Error(res,'Oops... No se pudo cambiar la imagen')
		}	
		return resp.Success(res,'Archivo subido con exito')
	}); 
};

async function GetAvatar(req, res){
	const id = req.user.id;
	const user = await Usuarios.findAll({
        where:{id:id},
        attributes: ['rut'],
    })
	.map(el => el.get({ plain: true }))

	var url= "./server/avatars/"+user[0].rut+".png"

	fs.readFile(url, function read(err, data) {
		if (err) {
			resp.Error(res)
		}
		else{
			resp.Success(res,"Imagen",data)
		}
	});

};



function register(req, res){

	const { nombre, correo, rut,password,cod_carrera} = req.body

	return Usuarios.findOne({  where: {
		[Op.or]: [{correo: correo}, {rut: rut}]
	  }})
	
	.then(exists => {
		if (exists){
			return resp.Error(res,'Oops... El usuario ya existe')
		}
		var user = {
			nombre,
            correo,
			rut,
            password: bcrypt.hashSync(password, config.saltRounds),
            cod_carrera
		}

		return addUser(user)
		.then(() => resp.Success(res,"Se ha registrado correctamente."))
		.catch(() => resp.Error(res,"Oops... Revise los datos otorgados"));

	})
	.catch((e) =>console.log(e));
	
};


module.exports = {
	login,
	register,
	GetData,
	ChangeColor,
	changePreferencias,
	ChangeAvatar,
	GetAvatar
}
