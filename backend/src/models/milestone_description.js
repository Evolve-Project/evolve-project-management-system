'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MilestoneDescription extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Milestone, { foreignKey: 'milestone_description_id' }); //this is the milestone_description_id in milestone table. Each Sdlc has many Milestones
    }
  }
  MilestoneDescription.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'MilestoneDescription',
    tableName: 'milestone_descriptions'
  });
  return MilestoneDescription;
};