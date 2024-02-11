'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('MentorFeedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      mentee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'mentees', key: 'id' }
      },
      mentor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'mentors', key: 'id' }
      },
      metric1_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      metric1_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric2_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      metric2_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric3_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      metric3_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MentorFeedbacks');
  }
};