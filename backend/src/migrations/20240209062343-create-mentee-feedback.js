'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('mentee_feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      mentee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'mentees',
          key: 'id',
        },
        allowNull: false
      },
      mentor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'mentors',
          key: 'id',
        },
        allowNull: false
      },
      performance_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      performance_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      team_work_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      team_work_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      interaction_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      interaction_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      problem_solving_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      problem_solving_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      punctuality_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      punctuality_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      submitted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mentee_feedbacks');
  }
};