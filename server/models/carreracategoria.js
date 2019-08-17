'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarreraCategoria = sequelize.define('CarreraCategoria', {
    cod_carrera: DataTypes.INTEGER,
    cod_categoria: DataTypes.INTEGER
  }, {});
  CarreraCategoria.associate = function(models) {
    // associations can be defined here
  };
  return CarreraCategoria;
};