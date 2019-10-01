'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    mensaje: {
      type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.BOOLEAN,
    },
    tipo:{
        type:   DataTypes.STRING,
        defaultValue: 'warning',
      },  

  }, {});
  Admin.associate = function(models) {

  };
  return Admin;
};