const jwt = require('jsonwebtoken');
const config =  require('../services/config');

const checkAuth = (req, res, next) => {
	var token = req.headers['authorization'];
	if (!token)
		return res.status(401).send({ auth: false, message: 'Error. Debe iniciar sesión' });

	jwt.verify(token, config.jwtSecret, (err, decoded) => {
		if (err)
			return res.status(401).send({ auth: false, message: 'Error al realizar esta accion. No tiene permisos' });

    req.user = {
			login: decoded.login,
			id: decoded.id
		};
    next();
	});
}

module.exports = {
	checkAuth
}
