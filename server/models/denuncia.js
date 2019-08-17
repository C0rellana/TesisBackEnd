'use strict';
module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('Denuncia', {
    descripcion: DataTypes.STRING,    
  }, {});
  Denuncia.associate = function(models) {
    // associations can be defined here
  };
  return Denuncia;
};