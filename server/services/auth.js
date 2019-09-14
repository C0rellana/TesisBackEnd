const model =require('../models');
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
			throw new CustomError('Oops... Usuario invalido.');

		if (!bcrypt.compareSync(params.password || '', Usuario.password))
			throw new CustomError('Oops... Usuario invalido.');

		const payload = {
			correo: Usuario.correo,
			id: Usuario.id,
			cod_carrera:Usuario.cod_carrera,
			time: new Date()
		};

		var token = jwt.sign(payload, config.jwtSecret, {
			expiresIn: config.tokenExpireTime
		});

		return {token};
	});
}

module.exports = {
	authenticate
}

