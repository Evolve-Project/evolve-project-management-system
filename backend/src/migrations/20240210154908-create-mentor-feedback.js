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
      interaction_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      interaction_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      support_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      support_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      encouragement_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      encouragement_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      feedback_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      feedback_feedback: {
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