'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Archivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      enlace: {
        type: Sequelize.STRING
      },
      año: {
        type: Sequelize.INTEGER
      },
      formato: {
        type: Sequelize.STRING
      },
      valoracion: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      cod_usuario: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Usuarios',
          key: 'id',
          as: 'autor',
        }
      }, 
      cod_ramo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Ramos',
          key: 'id',
          as: 'cod_ramo',
        }
      }, 
      cod_categoria: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Categoria',
          key: 'id',
          as: 'cod_categoria',
        }
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
    return queryInterface.dropTable('Archivos');
  }
};