/* eslint-disable */
'use strict';

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await hashPassword('password1');
    const hashedPassword2 = await hashPassword('password2');

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'user1@example.com',
          password: hashedPassword1,
          firstName: 'John',
          lastName: 'Doe',
        },
        {
          email: 'user2@example.com',
          password: hashedPassword2,
          firstName: 'Jane',
          lastName: 'Doe',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};