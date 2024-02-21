'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      task_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      task_desc: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'milestones',
          key: 'id'
        }
      },
      mentee_id: { // to be filled only when a mentee assigns a task to himself/herself
        type: DataTypes.INTEGER,
        references: {
          model: 'mentees',
          key: 'id'
        },
        allowNull: true
      },
      mentor_id: { 
        type: DataTypes.INTEGER,
        references: {
          model: 'mentors',
          key: 'id'
        },
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      task_completion_datetime: {
        type: DataTypes.DATE,
        allowNull: true
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
    await queryInterface.dropTable('tasks');
  }
};