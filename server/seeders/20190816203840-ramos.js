'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ramos', [
      {
        nombre: 'Inteligencia Artificial',
        codigo: 'ICI-612',
        cod_carrera:6,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Computación Gráfica',
        codigo: 'ICI-613',
        cod_carrera:6,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Ingeniería de Software I',
        codigo: 'INF-424',
        cod_carrera:6,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Ingeniería de Software II',
        codigo: 'ICI-424',
        cod_carrera:6,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Calidad y Productividad de Software',
        codigo: 'ICI-524',
        cod_carrera:6,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ramos', null, {});
  }
};
