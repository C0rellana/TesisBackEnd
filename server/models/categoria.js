'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});


  
  Categoria.associate = function(models) {
    // associations can be defined here
    Categoria.hasMany(models.Archivo, {
      foreignKey:  {name: 'cod_categoria', allowNull:false},
    });

    Categoria.belongsToMany(models.Carrera, {
      through: 'CarreraCategoria',
      as: 'CategoriaCarreras',
      foreignKey:  {name: 'cod_categoria', allowNull:false},
      otherKey:'cod_carrera',
    });

  };
  return Categoria;
};