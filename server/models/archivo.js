'use strict';
module.exports = (sequelize, DataTypes) => {
  const Archivo = sequelize.define('Archivo', {
    nombre: {
      type: DataTypes.STRING,

    },
    enlace: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    año: {
      type: DataTypes.INTEGER,
    },
    formato: {
      type: DataTypes.STRING,
    },
    valoracion: {
      type: DataTypes.FLOAT,
    },
    estado:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
     },  
    isEnlace: {
      type: DataTypes.BOOLEAN,
    },
    ubicacion: {
      type:   DataTypes.ENUM,
      values: ['GOOGLE', 'DROPBOX'] 
    },
    size: {
      type: DataTypes.INTEGER,
    },
    cod_contenido: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
      },
      references: {
        model: 'Contenido',
        key: 'id',
        as: 'cod_contenido',
      },
    },
    cod_usuario: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
      },
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'autor',
      },
    },
    cod_categoria: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      references: {
        model: 'Categoria',
        key: 'id',
        as: 'cod_categoria',
      },
    },

  }, {});
  Archivo.associate = function(models) {
    // associations can be defined here
    Archivo.belongsTo(models.Contenido, {
      foreignKey: {name: 'cod_contenido', allowNull:false},
      onDelete: 'CASCADE'
    });
    
    Archivo.belongsTo(models.Usuario, {
      foreignKey: {name: 'cod_usuario', allowNull:false},
      onDelete: 'CASCADE'
    });

    Archivo.hasMany(models.Denuncia, {
      foreignKey:  {name: 'cod_archivo', allowNull:false},
    });

    Archivo.belongsTo(models.Categoria, {
      foreignKey: {name: 'cod_categoria', allowNull:false},
      onDelete: 'CASCADE'
    });

  };
  return Archivo;
};