'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ramos', [
      {
        nombre: 'Inteligencia Artificial',
        codigo: 'ICI560-1',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Metodos Formales',
        codigo: 'ICI560-2',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'RAMO DE ICO 1',
        codigo: 'ICO560-1',
        cod_carrera:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'RAMO DE ICO 2',
        codigo: 'ICO560-2',
        cod_carrera:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'RAMO DE MEDICINA 1',
        codigo: 'MED560-1',
        cod_carrera:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'RAMO DE MEDICINA 2',
        codigo: 'MED560-2',
        cod_carrera:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ramos', null, {});
  }
};