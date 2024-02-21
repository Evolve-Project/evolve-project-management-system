'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.MilestoneDescription, { foreignKey: 'milestone_description_id' }); // this is the milestone_description_id in milestone table. Each Milestone belongs to one MilestoneDescription
      this.belongsTo(models.Team, { foreignKey: 'team_id' }); // this is the team_id in milestone table. Each Milestone belongs to one Team
      this.hasMany(models.Task, { foreignKey: 'milestone_id' }); // this is the milestone_id in task table. Each Milestone has many Tasks
    }
  }
  Milestone.init({
    milestone_description_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'milestone_descriptions',
        key: 'id',
      },
      allowNull: false
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    milestone_completion_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_tasks: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Milestone',
    tableName: 'milestones'
  });
  return Milestone;
};