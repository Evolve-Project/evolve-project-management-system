'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskFeedback.init({
    task_id: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    feedback_score: DataTypes.INTEGER,
    feedback_by_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskFeedback',
    tableName: 'task_feedbacks'
  });
  return TaskFeedback;
};