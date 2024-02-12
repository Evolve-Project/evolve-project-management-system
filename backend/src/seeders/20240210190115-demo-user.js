'use strict';

const { hash } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i <= 20; i++) {
      const hashedPassword = await hash(`password${i}`, 10);
      users.push({
        email: `mentee${i}@example.com`,
        password: hashedPassword,
        role: 'Mentee',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    for (let i = 0; i <= 5; i++) {
      const hashedPassword = await hash(`password${i}`, 10);
      users.push({
        email: `mentor${i}@example.com`,
        password: hashedPassword,
        role: 'Mentor',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    const hashedPassword = await hash(`password`, 10);
    users.push({
      email: `admin@example.com`,
      password: hashedPassword,
      role: 'Admin',
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
