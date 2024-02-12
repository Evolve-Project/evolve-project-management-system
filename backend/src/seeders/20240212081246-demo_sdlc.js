'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sdlcSteps = [
      { name: 'Requirements', description: 'Requirements gathering and analysis', start_date: new Date('2024-03-01'), end_date: new Date('2024-03-08'), createdAt: new Date(), updatedAt: new Date() },
      { name: 'Design', description: 'Design of software solution', start_date: new Date('2024-03-08'), end_date: new Date('2024-03-15'), createdAt: new Date(), updatedAt: new Date() },
      { name: 'Implementation', description: 'Coding and implementation', start_date: new Date('2024-03-15'), end_date: new Date('2024-03-22'), createdAt: new Date(), updatedAt: new Date() },
      { name: 'Testing', description: 'Testing and quality assurance', start_date: new Date('2024-03-22'), end_date: new Date('2024-03-29'), createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deployment', description: 'Deployment to live environment', start_date: new Date('2024-03-29'), end_date: new Date('2024-04-05'), createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maintenance', description: 'Ongoing maintenance and updates', start_date: new Date('2024-04-05'), end_date: new Date('2024-04-12'), createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('sdlc', sdlcSteps, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sdlc', null, {});
  }
};
