'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {

    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },

    sigla: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },
    token: {
      type: DataTypes.STRING(3000),
    },
    correo: {
      type: DataTypes.STRING,
    },
    ubicacion: {
      type:   DataTypes.ENUM,
      values: ['GOOGLE', 'DROPBOX'] 
    },
    carpeta_id: {
      type:   DataTypes.STRING,
    },
    
  }, {});
  Carrera.associate = function(models) {
    // associations can be defined here
    Carrera.hasMany(models.Usuario, {
      foreignKey:  {name: 'cod_carrera', allowNull:false},
    });
    Carrera.hasMany(models.Ramo, {
      foreignKey:  {name: 'cod_carrera', allowNull:false},
    });
    Carrera.hasMany(models.Categoria, {
      foreignKey:  {name: 'cod_carrera', allowNull:false},
    });
    

  };
  return Carrera;
};