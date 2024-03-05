'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medicine_contraindications', {
      medicineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicine',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contraindicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contraindications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medicine_contraindications');
  }
};
