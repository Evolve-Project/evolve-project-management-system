'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attendances = [];

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

      for (let i = 0; i < 5; i++) {
        const date_of_meet = faker.date.between('2024-03-01', '2024-04-12');

        for (const mentee of mentees) {
          attendances.push({
            mentor_id: faker.random.arrayElement(mentors),
            mentee_id: mentee,
            date_of_meet: date_of_meet,
            attendance: faker.random.arrayElement(['Present', 'Absent']),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }

    await queryInterface.bulkInsert('attendances', attendances, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendances', null, {});
  }
};