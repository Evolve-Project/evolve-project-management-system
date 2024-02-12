'use strict';
const faker = require('faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tasks = [];

    for (let i = 0; i < 5; i++) {
      tasks.push({
        task_name: faker.lorem.words(3),
        task_desc: faker.lorem.sentence(),
        milestone_id: faker.datatype.number({ min: 1, max: 10 }),
        project_id: faker.datatype.number({ min: 1, max: 10 }),
        mentee_id: faker.datatype.number({ min: 1, max: 10 }),
        status: faker.datatype.boolean(),
        task_completion_datetime: faker.date.future(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
