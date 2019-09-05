'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contenido = sequelize.define('Contenido', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },
    unidad: {
      type: DataTypes.INTEGER,
    },
    cod_ramo: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      references: {
        model: 'Ramo',
        key: 'id',
        as: 'cod_ramo',
      },
    },

  }, {});
  Contenido.associate = function(models) {
    // associations can be defined here
    Contenido.belongsTo(models.Ramo, {
      foreignKey: {name: 'cod_ramo', allowNull:false},
      onDelete: 'CASCADE'
    });

    Contenido.hasMany(models.Archivo, {
        foreignKey:  {name: 'cod_contenido', allowNull:false},
      });
    

  };
  return Contenido;
};