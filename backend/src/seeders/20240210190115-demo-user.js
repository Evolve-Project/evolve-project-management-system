'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i <= 20; i++) {
      users.push({
        email: `mentee${i}@example.com`,
        password: `password${i}`,
        role: 'Mentee',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    for (let i = 0; i <= 5; i++) {
      users.push({
        email: `mentor${i}@example.com`,
        password: `password${i}`,
        role: 'Mentor',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    users.push({
      email: `admin@example.com`,
      password: `password123`,
      role: 'Admin',
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
