'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      navegador:{
        type: Sequelize.STRING
      },  
      accion: {
        type: Sequelize.STRING
      },  
      metodo: {
        type: Sequelize.STRING
      },  
      date:{
        type: Sequelize.DATE
      }, 
      user:{
        type: Sequelize.INTEGER
      },    
      user_carrera_id:{
        type: Sequelize.INTEGER
      }, 
      user_carrera_nombre:{
        type: Sequelize.STRING
      }, 
      busqueda:{
        type: Sequelize.STRING
      },
      cod_carrera:{
        type: Sequelize.INTEGER
      },  
      cod_ramo:{
        type: Sequelize.INTEGER
      }, 
      cod_contenido:{
        type: Sequelize.INTEGER
      },  
      cod_categoria:{
        type: Sequelize.INTEGER
      }, 
      isEnlace:{
        type: Sequelize.BOOLEAN
      },
      descripcion:{
        type: Sequelize.STRING
      },  
      noda_deseada:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
};