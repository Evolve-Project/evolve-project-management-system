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
      mentor_user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false
      },
      mentee_user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_of_meet: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        },
        unique: true
      },
      attendance: {
        type: DataTypes.ENUM('Present', 'Absent', 'Leave'),
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