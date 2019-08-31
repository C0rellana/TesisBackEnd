'use strict';
module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('Denuncia', {
    descripcion: DataTypes.STRING,    
    estado:{
      type:   DataTypes.ENUM,
      values: ['activa', 'aceptada', 'rechazada'], 
      defaultValue: 'activa',
    },   

    cod_archivo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Archivo',
        key: 'id',
        as: 'cod_archivo',
      },
    },
    cod_tipodenuncia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tipodenuncia',
        key: 'id',
        as: 'cod_tipodenuncia',
      },
    },
    cod_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'cod_usuario',
      },
    },
  }, {});
  
  Denuncia.associate = function(models) {

    Denuncia.belongsTo(models.Tipodenuncia, {
      foreignKey: {name: 'cod_tipodenuncia', allowNull:false},
      onDelete: 'CASCADE'
    });

    Denuncia.belongsTo(models.Usuario, {
      foreignKey: {name: 'cod_usuario', allowNull:false},
      onDelete: 'CASCADE'
    });
    Denuncia.belongsTo(models.Archivo, {
      foreignKey: {name: 'cod_archivo', allowNull:false},
      onDelete: 'CASCADE'
    });

  };
  return Denuncia;
};