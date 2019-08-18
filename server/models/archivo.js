'use strict';
module.exports = (sequelize, DataTypes) => {
  const Archivo = sequelize.define('Archivo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
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
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
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
    cod_usuario: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
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
    Archivo.belongsTo(models.Ramo, {
      foreignKey: {name: 'cod_ramo', allowNull:false},
      onDelete: 'CASCADE'
    });
    
    Archivo.belongsTo(models.Usuario, {
      foreignKey: {name: 'cod_usuario', allowNull:false},
      onDelete: 'CASCADE'
    });

    Archivo.belongsToMany(models.Usuario, {
      through: 'Denuncia',
      as: 'ArchivoDenuncias',
      foreignKey:'cod_archivo',
      otherKey:'cod_usuario',
    });

    Archivo.belongsTo(models.Categoria, {
      foreignKey: {name: 'cod_categoria', allowNull:false},
      onDelete: 'CASCADE'
    });

  };
  return Archivo;
};