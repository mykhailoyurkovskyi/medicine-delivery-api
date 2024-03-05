/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users_roles',
      [
        {
          userId: 1,
          roleId: 1,
        },
        {
          userId: 2,
          roleId: 1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_roles', null, {});
  },
};