'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.bulkInsert('Carreras', [{
      nombre: 'Ingenieria Civil Informatica',
      sigla: 'ICI',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carreras', null, {});
  }
};
