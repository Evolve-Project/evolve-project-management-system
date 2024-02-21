'use strict';

const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    const projects = [];
    // adding 8 projects for 50 mentees and 10 mentors
    for (let i = 0; i < 8; i++) {
      projects.push({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-04-12'),
        status: faker.datatype.boolean(),
        git_repository_link: `https://github.com/${faker.internet.userName()}/${faker.lorem.slug()}`,
        trello_board_link: `https://trello.com/b/${faker.lorem.slug()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('projects', projects, {});
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
