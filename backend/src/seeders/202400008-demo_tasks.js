'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tasks = [];
    // adding 5 tasks for each milestone for each team
    for (let milestoneId = 1; milestoneId <= 30; milestoneId++) {
      for (let i = 0; i < 5; i++) {
        tasks.push({
          task_name: faker.lorem.words(3),
          task_desc: faker.lorem.sentence(),
          milestone_id: milestoneId,
          mentee_id: null,
          mentor_id: null,
          status: faker.datatype.boolean(),
          task_completion_datetime: null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};