'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MentorFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mentee, {foreignKey: 'mentee_id'}); // this is the mentee who is receiving the feedback
      this.belongsTo(models.Mentor, {foreignKey: 'mentor_id'}); // this is the mentor who is giving the feedback
    }
  }
  MentorFeedback.init({
    mentee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'mentees', key: 'id' }
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'mentors', key: 'id' }
    },
    interaction_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    interaction_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    doubt_clarification_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    doubt_clarification_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    support_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    support_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    submitted_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MentorFeedback',
    tableName: 'mentor_feedback'
  });
  return MentorFeedback;
};