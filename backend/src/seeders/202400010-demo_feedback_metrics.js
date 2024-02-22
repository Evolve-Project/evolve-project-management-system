'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const mentee_metrics = ["Performance", "Team Work", "Communication", "Problem Solving", "Timely delivery"];
    const mentor_metrics = ["Interaction", "Support", "Encouragement", "Feedback"];

    const feedbackMetrics = [
      { metric_name: mentee_metrics[0], role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentee_metrics[1], role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentee_metrics[2], role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentee_metrics[3], role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentee_metrics[4], role: 'Mentee', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentor_metrics[0], role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentor_metrics[1], role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentor_metrics[2], role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
      { metric_name: mentor_metrics[3], role: 'Mentor', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('feedback_metrics', feedbackMetrics, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('feedback_metrics', null, {});
  }
};