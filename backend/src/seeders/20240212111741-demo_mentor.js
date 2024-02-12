'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const mentors = [];
    // adding 10 mentors to the mentors table
    for (let userId = 52; userId <= 61; userId++) {
      mentors.push({
        user_id: userId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        Experience: faker.datatype.number({ min: 1, max: 10 }), // Random experience between 1 and 10
        project_id: ((userId - 52) % 5) + 1, // Cycle through project IDs from 1 to 5
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('mentors', mentors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mentors', null, {});
  }
};