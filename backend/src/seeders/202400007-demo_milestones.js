'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    const milestones = [];
    //adding 6 milestones for each team
    for (let teamId = 1; teamId <= 8; teamId++) {
      for (let milestoneDescId = 1; milestoneDescId <= 6; milestoneDescId++) {
        milestones.push({
          milestone_description_id: milestoneDescId,
          team_id: teamId,
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

  async down (queryInterface, DataTypes) {
    await queryInterface.bulkDelete('milestones', null, {});
  }
};
