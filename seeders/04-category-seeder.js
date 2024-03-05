'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Antibiotics',
          description: 'Medicines for the treatment of infectious diseases'
        },
        {
          name: 'Analgesics',
          description: 'Means to reduce pain'
        },
        {
          name: 'Vitamins',
          description: 'Vital substances for maintaining health'
        },
        {
          name: 'Anti-inflammatory agents',
          description: 'Means to reduce inflammation'
        },
        {
          name: 'Antihistamines',
          description: 'Means for the treatment of allergies'
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};