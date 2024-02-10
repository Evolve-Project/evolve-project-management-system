'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attendance.init({
    mentor_id: DataTypes.INTEGER,
    mentee_id: DataTypes.INTEGER,
    date_of_meet: DataTypes.DATE,
    attendance: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attendance',
    tableName: 'attendance'
  });
  return attendance;
};