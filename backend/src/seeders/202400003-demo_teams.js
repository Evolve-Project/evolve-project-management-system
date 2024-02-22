'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const teams = [];
//adding 8 teams to the teams table
    for (let projectId = 1; projectId <= 8; projectId++) {
      teams.push({
        project_id: projectId,
        team_name: faker.company.companyName(),
        total_team_members: faker.datatype.number({ min: 6, max: 7 }), // Random team size between 5 and 15
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('teams', teams, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('teams', null, {});
  }
};