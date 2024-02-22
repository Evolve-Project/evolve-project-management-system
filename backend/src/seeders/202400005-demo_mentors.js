'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const mentors = [];
    // adding 16 mentors to the mentors table
    for (let userId = 52; userId <= 67; userId++) {
      mentors.push({
        user_id: userId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        Experience: faker.datatype.number({ min: 1, max: 10 }), // Random experience between 1 and 10
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('mentors', mentors, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('mentors', null, {});
  }
};