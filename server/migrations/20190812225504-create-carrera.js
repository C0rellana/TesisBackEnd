'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Carreras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sigla: {
        allowNull: false,
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING(3000)
      },
      correo: {
        type: Sequelize.STRING
      },
      carpeta_id: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type:   Sequelize.ENUM,
        values: ['GOOGLE', 'DROPBOX'] 
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
    return queryInterface.dropTable('Carreras');
  }
};