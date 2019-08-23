'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tipodenuncia = sequelize.define('Tipodenuncia', {

    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },
  }, {});

  Tipodenuncia.associate = function(models) {
    Tipodenuncia.hasMany(models.Denuncia, {
        foreignKey:  {name: 'cod_tipodenuncia', allowNull:false},
        
      });
      
  };
  return Tipodenuncia;
};

