'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Mentee, { foreignKey: 'project_id'}); // this is the project_id in mentee table. Each Project has many Mentees
      this.hasMany(models.Mentor, { foreignKey: 'project_id'}); // this is the project_id in mentor table. Each Project has many Mentors
      this.hasMany(models.Milestone, { foreignKey: 'project_id'}); // this is the project_id in milestone table. Each Project has many Milestones
      this.hasMany(models.Task, { foreignKey: 'project_id'}); // this is the project_id in task table. Each Project has many Tasks
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE, //we might need to change data type to dateonly
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE, //we might need to change data type to dateonly
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    git_repository_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    trello_board_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects'
  });
  return Project;
};