'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('milestones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sdlc_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sdlc',
          key: 'id',
        },
        allowNull: false
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'projects',
          key: 'id',
        },
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      milestone_completion_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      total_tasks: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('milestones');
  }
};