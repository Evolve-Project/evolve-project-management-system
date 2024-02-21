'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const feedbackMetrics = [
      { metric_name: 'Communication Skills', role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Knowledge in the Field', role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Availability and Responsiveness', role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Understanding of Concepts', role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Application of Knowledge', role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Problem Solving Skills', role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Teamwork and Collaboration', role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: 'Adaptability and Learning Speed', role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('feedback_metrics', feedbackMetrics, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('feedback_metrics', null, {});
  }
};