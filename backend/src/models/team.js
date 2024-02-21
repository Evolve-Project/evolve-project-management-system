
// temporary file, delete after use
// a way to fetch team mentee details asscoiated with a mentor for attendance taking

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // define association here
      Team.belongsTo(models.Project, {foreignKey: 'project_id', onDelete: 'CASCADE'}); // a team belongs to a project
      Team.hasMany(models.Mentor, {foreignKey: 'team_id', onDelete: 'CASCADE'}); // a team can have many mentors
      Team.hasMany(models.Mentee, {foreignKey: 'team_id', onDelete: 'CASCADE'}); // a team can have many mentees
      Team.hasMany(models.Milestone, {foreignKey: 'team_id', onDelete: 'CASCADE'}); // a team can have many milestones
      Team.hasMany(models.Query, {foreignKey: 'team_id', onDelete: 'CASCADE'}); // a team can have many queries
    }
  }
  Team.init({
    project_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id'
      },
      allowNull: true,
      unique: true
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_team_members: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'teams',
  });
  return Team;
};