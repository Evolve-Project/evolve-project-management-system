'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    task_name: DataTypes.STRING,
    task_desc: DataTypes.STRING,
    milestone_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    mentee_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    task_completion_datetime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
  });
  return Task;
};