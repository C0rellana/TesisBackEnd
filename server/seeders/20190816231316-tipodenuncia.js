'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tipodenuncia', [
      {
       
        nombre: 'Derechos de autor',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido inapropiado',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Otro',
        createdAt : new Date(),
        updatedAt : new Date(),
      },

  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tipodenuncia', null, {});
  }
};
