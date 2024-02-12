'use strict';

const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const projects = [];
    // adding 5 projects for 50 mentees and 10 mentors
    for (let i = 0; i < 5; i++) {
      projects.push({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        start_date: faker.date.past(),
        end_date: faker.date.future(),
        status: faker.datatype.boolean(),
        git_repository_link: `https://github.com/${faker.internet.userName()}/${faker.lorem.slug()}`,
        trello_board_link: `https://trello.com/b/${faker.lorem.slug()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('projects', projects, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
