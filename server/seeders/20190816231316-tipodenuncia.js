'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tipodenuncia', [
      {
        id:1,
        nombre: 'Derechos de autor',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {id:2,
        nombre: 'Contenido inapropiado',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {id:3,
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
