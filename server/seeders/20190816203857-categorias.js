'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categoria', [
      {
        nombre: 'LIBROS',
        descripcion: 'Sección para almacenar lirbos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-book mr-2',
        color:'#f70303'
      },
      {
        nombre: 'GUIAS',
        descripcion: 'Sección para almacenar guias que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-chain-broken mr-2',
        color:'#f77d03'
      },
      {
        nombre: 'TRABAJOS',
        descripcion: 'Sección para almacenar trabajos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-archive-o mr-2',
        color:'#f9c503'
      },
      {
        nombre: 'PRUEBAS',
        descripcion: 'Sección para almacenar pruebas que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-pdf-o mr-2',
        color:'#77f903'
      },
      {
        nombre: 'VIDEOS',
        descripcion: 'Sección para almacenar videos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-youtube-play mr-2',
        color:'#03f9cc'
      },
      {
        nombre: 'TALLERES',
        descripcion: 'Sección para almacenar material relacionado con talleres realizados en el ramo que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-briefcase mr-2',
        color:'#0351f9'
      },
      {
        nombre: 'CONTROLES',
        descripcion: 'Sección para almacenar controles que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-briefcase mr-2',
        color:'#d703f9'
       
      },
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};
