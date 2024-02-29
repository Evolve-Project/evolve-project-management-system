'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const feedbacks = [];

    const teamUserMapping = {
      1: [52,60,2,10,18,26,34,42,50],
      2: [53,61,3,11,19,27,35,43,51],
      3: [54,62,4,12,20,28,36,44],
      4: [55,63,5,13,21,29,37,45],
      5: [56,64,6,14,22,30,38,46],
      6: [57,65,7,15,23,31,39,47],
      7: [58,66,8,16,24,32,40,48],
      8: [59,67,9,17,25,33,41,49]
    };

    for (const teamId in teamUserMapping) {
      const teamMembers = teamUserMapping[teamId];
      const mentors = teamMembers.slice(0, 2);
      const mentees = teamMembers.slice(2);

      // Each mentee will rate each mentor on 4 different metrics (6 to 9)
      for (const mentee of mentees) {
        for (const mentor of mentors) {
          for (let metricId = 6; metricId <= 9; metricId++) {
            feedbacks.push({
              metric_id: metricId,
              rating: faker.datatype.number({ min: 1, max: 5 }), // Random rating between 1 and 5
              review: faker.lorem.paragraph(),
              given_to_user_id: mentor,
              given_by_user_id: mentee,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }

      // Each mentor will rate each mentee based on 5 metrics (1 to 5)
      for (const mentor of mentors) {
        for (const mentee of mentees) {
          for (let metricId = 1; metricId <= 5; metricId++) {
            feedbacks.push({
              metric_id: metricId,
              rating: faker.datatype.number({ min: 1, max: 5 }), // Random rating between 1 and 5
              review: faker.lorem.paragraph(),
              given_to_user_id: mentee,
              given_by_user_id: mentor,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }
    }

    await queryInterface.bulkInsert('feedbacks', feedbacks, {});
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('feedbacks', null, {});
  }
};