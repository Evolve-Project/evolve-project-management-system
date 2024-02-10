'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenteeFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mentee, {foreignKey: 'mentee_id'}); // this is the mentee who is giving the feedback
      this.belongsTo(models.Mentor, {foreignKey: 'mentor_id'}); // this is the mentor who is receiving the feedback

    }
  }
  MenteeFeedback.init({
    mentee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mentees',
        key: 'id',
      },
      allowNull: false
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mentors',
        key: 'id',
      },
      allowNull: false
    },
    metric1_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    metric1_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metric2_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    metric2_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metric3_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    metric3_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metric4_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    metric4_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metric5_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    metric5_feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'MenteeFeedback',
    tableName: 'mentee_feedbacks'
  });
  return MenteeFeedback;
};