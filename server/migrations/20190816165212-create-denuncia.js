'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Denuncia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado:{
        type:   Sequelize.ENUM,
        values: ['activa', 'aceptada', 'rechazada'] 
      },  
      cod_archivo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Archivos',
          key: 'id',
          as: 'cod_archivo',
        }
      },    
      cod_usuario: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Usuarios',
          key: 'id',
          as: 'cod_usuario',
        }
      },    
      cod_tipodenuncia: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Tipodenuncia',
          key: 'id',
          as: 'cod_tipodenuncia',
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
    return queryInterface.dropTable('Denuncia');
  }
};