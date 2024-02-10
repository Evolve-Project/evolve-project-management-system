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
    }
  }
  Milestone.init({
    sdlc_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    milestone_completion_datetime: DataTypes.DATE,
    total_tasks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Milestone',
    tableName: 'milestones'
  });
  return Milestone;
};