'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contenidos', [
      {
        nombre: 'Introducción a la Ingeniería de software y modelos de proceso de software.',
        cod_ramo:3,
        unidad:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Gestión integrada del proyecto.',
        cod_ramo:3,
        unidad:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Análisis y modelamiento de sistema',
        cod_ramo:3,
        unidad:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Case, framework y entorno de la ingeniería de software',
        cod_ramo:3,
        unidad:4,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Mantenimiento y Documentación',
        cod_ramo:4,
        unidad:1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Métricas',
        cod_ramo:4,
        unidad:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Diseño de Interfaces de Usuario',
        cod_ramo:4,
        unidad:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Topicos Avanzados en Ingeniería de Software',
        cod_ramo:4,
        unidad:4,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Introducción a la Calidad',
        cod_ramo:5,
        unidad: 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Calidad de Productos de Software',
        cod_ramo:5,
        unidad:2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Calidad del Proceso de Software',
        cod_ramo:5,
        unidad:3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        nombre: 'Evaluación y Mejora de Procesos',
        cod_ramo:5,
        unidad:4,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
      nombre: 'Otros Aspectos de Calidad de Sistemas de Información.',
      cod_ramo:5,
      unidad:5,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contenidos', null, {});
  }
};
