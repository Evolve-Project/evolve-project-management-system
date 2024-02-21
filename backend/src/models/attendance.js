'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'mentor_user_id' }); // Each Attendance belongs to one Mentor
      this.belongsTo(models.User, { foreignKey: 'mentee_user_id' }); // Each Attendance belongs to one Mentee
    }
  }
  Attendance.init({
    mentor_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false
    },
    mentee_users_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
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
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances'
  });
  return Attendance;
};