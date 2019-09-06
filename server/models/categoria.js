'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    
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


  
  Categoria.associate = function(models) {
    // associations can be defined here
    Categoria.hasMany(models.Archivo, {
      foreignKey:  {name: 'cod_categoria', allowNull:false},
    });

    Categoria.belongsTo(models.Carrera, {
      foreignKey: {name: 'cod_carrera', allowNull:false},
      onDelete: 'CASCADE'
    });

  };
  return Categoria;
};