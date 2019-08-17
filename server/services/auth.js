import model from '../models';
const { Usuario, Carrera } = model;

const CustomError = require('./customError');
const config =  require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = params => {
	return Usuario.findOne({
		where: {
			correo: params.correo
		},
		raw: true
	}).then(Usuario => {
		if (!Usuario)
			throw new CustomError('Error al iniciar sesión. Usuario invalido.');

		if (!bcrypt.compareSync(params.password || '', Usuario.password))
			throw new CustomError('Error al iniciar sesión. Contraseña invalida.');

		const payload = {
			correo: Usuario.correo,
			id: Usuario.id,
			time: new Date()
		};

		var token = jwt.sign(payload, config.jwtSecret, {
			expiresIn: config.tokenExpireTime
		});

		return {token: token,id:Usuario.id,nombre: Usuario.nombre,role:Usuario.role, carrera: Usuario.cod_carrera};
	});
}

module.exports = {
	authenticate
}

