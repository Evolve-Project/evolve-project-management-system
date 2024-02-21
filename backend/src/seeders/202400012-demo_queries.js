'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Manually created mapping of team_id to an array of user_ids
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

    const queries = [];
    let queryId = 1;

    for (const teamId in teamUserMapping) {
      const userIds = teamUserMapping[teamId];
      let queriesCount = 0;

      for (const userId of userIds) {
        const reply_id = queriesCount > 0 ? faker.datatype.number({ min: queryId - queriesCount, max: queryId - 1 }) : null;

        queries.push({
          text: faker.lorem.sentence(),
          user_id: userId,
          team_id: teamId,
          reply_id: reply_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        queriesCount++;
        queryId++;
      }
    }

    await queryInterface.bulkInsert('queries', queries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('queries', null, {});
  }
};