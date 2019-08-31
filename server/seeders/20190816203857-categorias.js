'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categoria', [
      {
        id:1,
        nombre: 'LIBROS',
        cod_carrera:1,
        descripcion: 'Sección para almacenar lirbos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-book mr-2',
        color:'#f70303'
      },
      {id:2,
        nombre: 'GUIAS',
        cod_carrera:1,
        descripcion: 'Sección para almacenar guias que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-chain-broken mr-2',
        color:'#f77d03'
      },
      {id:3,
        nombre: 'TRABAJOS',
        cod_carrera:1,
        descripcion: 'Sección para almacenar trabajos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-archive-o mr-2',
        color:'#f9c503'
      },
      {id:4,
        nombre: 'PRUEBAS',
        cod_carrera:1,
        descripcion: 'Sección para almacenar pruebas que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-file-pdf-o mr-2',
        color:'#77f903'
      },
      {id:5,
        nombre: 'VIDEOS',
        cod_carrera:1,
        descripcion: 'Sección para almacenar videos que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-youtube-play mr-2',
        color:'#03f9cc'
      },
      {id:6,
        nombre: 'TALLERES',
        cod_carrera:1,
        descripcion: 'Sección para almacenar material relacionado con talleres realizados en el ramo que ayuden a otros compañeros',
        createdAt : new Date(),
        updatedAt : new Date(),
        icon: 'fa fa-briefcase mr-2',
        color:'#0351f9'
      },
      {id:7,
        nombre: 'CONTROLES',
        cod_carrera:1,
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
