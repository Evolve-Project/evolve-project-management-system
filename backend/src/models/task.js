'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Milestone, { foreignKey: 'milestone_id' }); // this is the milestone_id in task table. Each Task belongs to one Milestone
      this.belongsTo(models.User, { foreignKey: 'mentee_user_id' }); // this is the mentee_user_id in task table. Each Task is assigned to one mentee user
      this.belongsTo(models.User, { foreignKey: 'mentor_user_id' }); // this is the mentor_user_id in task table. Each Task is assigned to one mentor user
    }

    

  
}
  


  Task.init({
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    task_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    milestone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'milestones',
        key: 'id'
      }
    },
    mentee_user_id: { // to be filled only when a mentee assigns a task to himself/herself
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: true
    },
    mentor_user_id: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    task_completion_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
   
  });
  return Task;
};