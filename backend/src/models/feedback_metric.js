'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedbackMetric extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Feedback, { foreignKey: 'metric_id' }); // a feedback metric can have many feedbacks
    }
  }
  FeedbackMetric.init({
    metric_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true
    },
    role: {
      type: DataTypes.ENUM('Mentor', 'Mentee'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FeedbackMetric',
    tableName: 'feedback_metrics',
  });
  return FeedbackMetric;
};