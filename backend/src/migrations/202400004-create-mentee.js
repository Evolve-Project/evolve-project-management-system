'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('mentees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        unique: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      University: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      home_city: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
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
    await queryInterface.dropTable('mentees');
  }
};