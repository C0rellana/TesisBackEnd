'use strict';

const salida =[];

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    const carreras = await queryInterface.sequelize.query('SELECT COUNT(*) from "Carreras"');
    const categorias = await queryInterface.sequelize.query('SELECT COUNT(*) from "Categoria"');

    for (let i = 1; i <= carreras[0][0].count; i++) {
      for (let j = 1; j <= categorias[0][0].count; j++) {
        
        salida.push(
          { 
            cod_carrera: i,
            cod_categoria: j,
            createdAt : new Date(),
            updatedAt : new Date(),
          }
        )
    
      }
    }

    await queryInterface.bulkInsert('CarreraCategoria', salida, {});

  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CarreraCategoria', null, {});
  }
};
