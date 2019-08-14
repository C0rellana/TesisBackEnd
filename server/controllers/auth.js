const config =  require('../services/config');
const bcrypt = require('bcrypt');
const authService = require('../services/auth');
const Usuarios = require('../models').Usuario;


const addUser = user => Usuarios.create(user);
const getUserByLogin = correo => Usuarios.findOne({where: {correo}});


function login(req, res){
	return authService.authenticate(req.body)
	.then(data => {
		res.send({
			success: true,
			data
		});
	})
	.catch(err => {
		if (err.type === 'custom'){
			return res.send({
				success: false,
				message: err.message
			});
		}
		return res.send({
			success: false,
			message: 'Error al iniciar sesión. Error desconocido.'
		});
	})
};

function register(req, res){

	const { nombre, correo, rut,password,cod_carrera} = req.body

	return getUserByLogin(req.body.correo || '')
	.then(exists => {

		if (exists){
			return res.send({
				success: false,
				message: 'Registro fallido. El correo ingresado ya existe.'
			});
		}

		var user = {
			nombre,
            correo,
            rut,
            password: bcrypt.hashSync(password, config.saltRounds),
            cod_carrera
		}

		return addUser(user)
		.then(() => res.send({success: true}));
	});
};



module.exports = {
	login,
	register
}
