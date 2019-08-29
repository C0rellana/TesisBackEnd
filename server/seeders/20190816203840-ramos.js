'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ramos', [
      {
        nombre: 'Inteligencia Artificial',
        codigo: 'ICI-612',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Computación Gráfica',
        codigo: 'ICI-613',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Ingeniería de Software I',
        codigo: 'INF-424',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Ingeniería de Software II',
        codigo: 'ICI-424',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Calidad y Productividad de Software',
        codigo: 'ICI-524',
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
