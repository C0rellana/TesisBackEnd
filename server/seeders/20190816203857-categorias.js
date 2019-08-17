'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categoria', [
      {
        id:1,
        nombre: 'LIBROS',
        descripcion: 'Sección para almacenar lirbos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-book mr-2',
      },
      {id:2,
        nombre: 'GUIAS',
        descripcion: 'Sección para almacenar guias que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-chain-broken mr-2',
      },
      {id:3,
        nombre: 'TRABAJOS',
        descripcion: 'Sección para almacenar trabajos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-archive-o mr-2'
      },
      {id:4,
        nombre: 'PRUEBAS',
        descripcion: 'Sección para almacenar pruebas que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-pdf-o mr-2'
      },
      {id:5,
        nombre: 'VIDEOS',
        descripcion: 'Sección para almacenar videos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-youtube-play mr-2',
      },
      {id:6,
        nombre: 'PRACTICAS',
        descripcion: 'Sección para almacenar material relacionado con las practicas que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-briefcase mr-2',
      }
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};
