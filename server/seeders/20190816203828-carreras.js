'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.bulkInsert('Carreras', [
      {
        nombre: 'Ingenieria Civil Informatica',
        sigla: 'ICI',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Ingenieria Civil Contruccion',
        sigla: 'ICO',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Medicina',
        sigla: 'MED',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carreras', null, {});
  }
};
