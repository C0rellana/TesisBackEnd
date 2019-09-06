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
        nombre: 'USER1 INFORMATICA',
        rut: '11111111-2',
        correo: 'USER1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'USER',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'USER CONSTRUCCION',
        rut: '11111111-3',
        correo: 'USER2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:2,
        role:'USER',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'CGA CONSTRUCCION',
        rut: '11111111-4',
        correo: 'CGA1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'CGA',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'CGA CONSTRUCCION',
        rut: '11111111-5',
        correo: 'CGA2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:2,
        role:'CGA',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'DIRECTOR INFORMATICA',
        rut: '11111111-6',
        correo: 'DIRECTOR1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:1,
        role:'DIRECTOR',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'DIRECTOR CONSTRUCCION',
        rut: '11111111-7',
        correo: 'DIRECTOR2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:2,
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
