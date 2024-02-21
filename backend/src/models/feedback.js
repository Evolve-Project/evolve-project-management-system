'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.FeedbackMetric, { foreignKey: 'metric_id' }); // a feedback belongs to a feedback metric
      this.belongsTo(models.User, { foreignKey: 'given_to_user_id' }); // a feedback belongs to a user
      this.belongsTo(models.User, { foreignKey: 'given_by_user_id' }); // a feedback belongs to a user
    }
  }
  Feedback.init({
    metric_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'feedback_metrics',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.TEXT,
    },
    given_to_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    given_by_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
  });
  return Feedback;
};