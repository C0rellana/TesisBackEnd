'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    ip: {
      type: DataTypes.STRING,
    },
    navegador: {
      type: DataTypes.STRING,
    },
    accion: {
        type: DataTypes.STRING
      },  
    metodo: {
        type: DataTypes.STRING
    },  
    date:{
        type: DataTypes.DATE
    }, 
    user:{
        type: DataTypes.INTEGER
    },    
    user_carrera_id:{
        type: DataTypes.INTEGER
    }, 
    user_carrera_nombre:{
        type: DataTypes.STRING
    }, 
    busqueda:{
        type: DataTypes.STRING
    },
    cod_carrera:{
        type: DataTypes.INTEGER
    },  
    cod_ramo:{
        type: DataTypes.INTEGER
    }, 
    cod_contenido:{
        type: DataTypes.INTEGER
    },  
    cod_categoria:{
        type: DataTypes.INTEGER
    }, 
    isEnlace:{
        type: DataTypes.BOOLEAN
    },
    descripcion:{
        type: DataTypes.STRING
    },  
    noda_deseada:{
        type: DataTypes.INTEGER
    },

  }, {});
  Log.associate = function(models) {
    // associations can be defined here

  };
  return Log;
};