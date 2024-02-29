'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const mentees = [];
    // adding 50 mentees to the mentees table
    for (let userId = 2; userId <= 51; userId++) {
      mentees.push({
        user_id: userId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        University: faker.company.companyName(),
        dob: faker.date.past(),
        home_city: faker.address.city(),
        // team_id: ((userId - 2) % 8) + 1, // Cycle through team IDs from 1 to 8
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('mentees', mentees, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('mentees', null, {});
  }
};