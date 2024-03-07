'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'photos',
      [
        {
          medicineId: 1,
          imageUrl: 'img/amoxicillin.jpg',
        },
        {
          medicineId: 2,
          imageUrl: 'img/azithromycin.jpg',
        },
        {
          medicineId: 3,
          imageUrl: 'img/Ciprofloxacin.jpg',
        },
        {
          medicineId: 4,
          imageUrl: 'img/Doxycycline.jpg',
        },
        {
          medicineId: 5,
          imageUrl: 'img/Clarithromycin.jpg',
        },
        {
          medicineId: 6,
          imageUrl: 'img/Paracetamol.jpg',
        },
        {
          medicineId: 7,
          imageUrl: 'img/Aspirin.jpg',
        },
        {
          medicineId: 8,
          imageUrl: 'img/Acetaminophen.jpg',
        },
        {
          medicineId: 9,
          imageUrl: 'img/Naproxen.jpg',
        },
        {
          medicineId: 10,
          imageUrl: 'img/Diclofenac.jpg',
        },
        {
          medicineId: 11,
          imageUrl: 'img/NOW Foods Vitamin D3.jpg',
        },
        {
          medicineId: 12,
          imageUrl: 'img/California Gold Nutrition Vitamin C Plus Zinc.jpg',
        },
        {
          medicineId: 13,
          imageUrl: 'img/Forever Omega-3 Fish Oil.jpg',
        },
        {
          medicineId: 14,
          imageUrl: 'img/California Gold Nutrition Vitamin B Complex.jpg',
        },
        {
          medicineId: 15,
          imageUrl: 'img/California Gold Nutrition Vitamin E Oil.jpg',
        },
        {
          medicineId: 16,
          imageUrl: 'img/Ibuprofen.jpg',
        },
        {
          medicineId: 17,
          imageUrl: 'img/Naproxen Sensetive.jpg',
        },
        {
          medicineId: 18,
          imageUrl: 'img/Diclofenac Anti-inflammatory agent.jpg',
        },
        {
          medicineId: 19,
          imageUrl: 'img/Celecoxib.jpg',
        },
        {
          medicineId: 20,
          imageUrl: 'img/Meloxicam.jpg',
        },
        {
          medicineId: 21,
          imageUrl: 'img/Loratadine.jpg',
        },
        {
          medicineId: 22,
          imageUrl: 'img/Cetirizine.jpg',
        },
        {
          medicineId: 23,
          imageUrl: 'img/Fexofenadine.jpg',
        },
        {
          medicineId: 24,
          imageUrl: 'img/Diphenhydramine.jpg',
        },
        {
          medicineId: 25,
          imageUrl: 'img/Chlorpheniramine.jpg',
        },
        
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('photos', null, {});
  },
};