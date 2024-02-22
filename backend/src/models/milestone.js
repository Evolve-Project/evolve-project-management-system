'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sdlc, { foreignKey: 'sdlc_id' }); // this is the sdlc_id in milestone table. Each Milestone belongs to one Sdlc
      this.belongsTo(models.Project, { foreignKey: 'project_id' }); // this is the project_id in milestone table. Each Milestone belongs to one Project
      this.hasMany(models.Task, { foreignKey: 'milestone_id' }); // this is the milestone_id in task table. Each Milestone has many Tasks
    }
  }
  Milestone.init({
    sdlc_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sdlc',
        key: 'id',
      },
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
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