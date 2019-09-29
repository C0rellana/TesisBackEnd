'use strict';
const config =  require('../services/config');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'ADMIN',
        rut: '11111111',
        correo: 'ADMIN@gmail.com',
        cod_carrera:6,
        password: bcrypt.hashSync('123456', config.saltRounds),
        role:'ADMIN',
        color:"#001740",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'USER1 INFORMATICA',
        rut: '11111112',
        correo: 'USER1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:6,
        role:'USER',
        color:"#001740",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'USER CONSTRUCCION',
        rut: '11111113',
        correo: 'USER2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:8,
        color:"#001740",
        role:'USER',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'CGA INFORMATICA',
        rut: '11111114',
        correo: 'CGA1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:6,
        color:"#001740",
        role:'CGA',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'CGA CONSTRUCCION',
        rut: '11111115',
        color:"#001740",
        correo: 'CGA2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:8,
        role:'CGA',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'DIRECTOR INFORMATICA',
        rut: '11111116',
        color:"#001740",
        correo: 'DIRECTOR1@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:6,
        role:'DIRECTOR',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'DIRECTOR CONSTRUCCION',
        rut: '11111117',
        color:"#001740",
        correo: 'DIRECTOR2@gmail.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        cod_carrera:8,
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
