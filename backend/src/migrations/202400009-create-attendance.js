'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      mentor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'mentors',
          key: 'id',
        },
        allowNull: false
      },
      mentee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'mentees',
          key: 'id',
        },
        allowNull: false
      },
      date_of_meet: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      attendance: {
        type: DataTypes.ENUM('Present', 'Absent'),
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
    await queryInterface.dropTable('attendances');
  }
};