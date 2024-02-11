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
      metric1_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metric1_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric2_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metric2_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric3_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metric3_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric4_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metric4_feedback: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      metric5_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      metric5_feedback: {
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