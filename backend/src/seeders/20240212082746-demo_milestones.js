'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const milestones = [];
    //adding 6 milestones for each project
    for (let projectId = 1; projectId <= 5; projectId++) {
      for (let sdlcId = 1; sdlcId <= 6; sdlcId++) {
        milestones.push({
          sdlc_id: sdlcId,
          project_id: projectId,
          status: false,
          milestone_completion_datetime: null,
          total_tasks: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('milestones', milestones, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('milestones', null, {});
  }
};
