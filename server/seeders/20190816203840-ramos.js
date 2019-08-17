'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ramos', [
      {
        nombre: 'Inteligencia Artificial',
        codigo: 'ICI560-2',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Metodos Formales',
        codigo: 'ICI560-3',
        cod_carrera:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      }
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ramos', null, {});
  }
};
