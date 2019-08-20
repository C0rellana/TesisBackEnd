'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contenidos', [
      {
        nombre: 'Contenido 1 RAMO 1 ICI',
        cod_ramo:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido 2 RAMO 1 ICI',
        cod_ramo:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido 1 RAMO 2 ICI',
        cod_ramo:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido 1 RAMO 1 ICO',
        cod_ramo:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido 2 RAMO 1 ICO',
        cod_ramo:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Contenido 1 RAMO 1 MEDICINA',
        cod_ramo:5,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contenidos', null, {});
  }
};
