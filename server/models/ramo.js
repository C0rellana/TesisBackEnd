'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ramo = sequelize.define('Ramo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },
    codigo: {
      type: DataTypes.STRING,
    },
    cod_carrera: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      references: {
        model: 'Carrera',
        key: 'id',
        as: 'cod_carrera',
      },
    },

  }, {});
  Ramo.associate = function(models) {
    // associations can be defined here
    Ramo.belongsTo(models.Carrera, {
      foreignKey: {name: 'cod_carrera', allowNull:false},
      onDelete: 'CASCADE'
    });
    Ramo.hasMany(models.Archivo, {
      foreignKey:  {name: 'cod_ramo', allowNull:false},
    });

  };
  return Ramo;
};