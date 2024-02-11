'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Mentor, { foreignKey: 'mentor_id' }); //this is the mentor_id in attendance table. Each Attendance belongs to one Mentor
      this.belongsTo(models.Mentee, { foreignKey: 'mentee_id' }); // this is the mentee_id in attendance table. Each Attendance belongs to one Mentee
    }
  }
  Attendance.init({
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
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendance'
  });
  return Attendance;
};