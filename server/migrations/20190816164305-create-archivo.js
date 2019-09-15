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
        type: Sequelize.FLOAT
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      isEnlace: {
        type: Sequelize.BOOLEAN
      },
      ubicacion: {
        type:   Sequelize.ENUM,
        values: ['GOOGLE', 'DROPBOX'] 
      },
      size: {
        type:  Sequelize.INTEGER
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
      cod_contenido: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Contenidos',
          key: 'id',
          as: 'cod_contenido',
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