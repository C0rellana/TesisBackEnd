'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      }
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      unique: {
        name:"user",
        args: true,
        msg: 'Este rut ya existe'
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER"
    },
    preferencias: {
      type: DataTypes.TEXT,
      // defaultValue: "{'color':'','columnas':''}"
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#001740"
    },
    resetPasswordToken:{
      type: DataTypes.STRING,
    },
    resetPasswordExpires:{
      type: DataTypes.DATE,
    },
    img: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      unique: {
        args: true,
        msg: 'Este correo ya existe'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Debes ingresar un correo valido'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Debes completar este campo'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 6) {
            throw new Error('La password debe tener mas de 6 caracteres');
          }
        },
      }
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
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.Carrera, {
      foreignKey: {name: 'cod_carrera', allowNull:false},
      onDelete: 'CASCADE'
    });
    
    Usuario.hasMany(models.Denuncia, {
      foreignKey:  {name: 'cod_usuario', allowNull:false},
    });
    Usuario.hasMany(models.Archivo, {
      foreignKey:  {name: 'cod_usuario', allowNull:false},
    });
    

  };
  return Usuario;
};