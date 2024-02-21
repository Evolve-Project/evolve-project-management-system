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
      milestone_description_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'milestone_descriptions',
          key: 'id',
        },
        allowNull: false
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('milestones');
  }
};