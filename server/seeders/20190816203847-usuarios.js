'use strict';
const config =  require('../services/config');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'ADMIN',
        rut: '11111111-1',
        correo: 'ADMIN@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'ADMIN',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'USER',
        rut: '11111111-2',
        correo: 'USER@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'USER',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'CGA',
        rut: '11111111-3',
        correo: 'CGA@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'CGA',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'DIRECTOR',
        rut: '11111111-4',
        correo: 'DIRECTOR@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'DIRECTOR',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
