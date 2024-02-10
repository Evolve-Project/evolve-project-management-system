'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, { foreignKey: 'user_id'});  // this is the user_id in the mentee table and has one to one relationship with the user table
      this.belongsTo(models.Project, { foreignKey: 'project_id'}); // this is the project_id in the mentee table and has many to one relationship with the project table
      this.hasMany(models.Attendance, { foreignKey: 'mentee_id' }); //this is the mentee_id in attendance table. Each Mentee can have many Attendances
      this.hasMany(models.Task, { foreignKey: 'mentee_id' }); // this is the mentee_id in task table. Each Mentee can have many Tasks
      this.hasMany(models.MenteeFeedback, { foreignKey: 'mentee_id' }); // this is the mentee_id in mentee_feedback table. Each Mentee can have many MenteeFeedbacks
      this.hasMany(models.MentorFeedback, { foreignKey: 'mentee_id' }); // this is the mentee_id in mentor_feedback table. Each Mentee can have many MentorFeedbacks
      
    }
  }
  Mentee.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // name of your model (table)
        key: 'id',
      },
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    University: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    home_city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects', // name of your model (table)
        key: 'id',
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Mentee',
    tableName: 'mentees'
  });
  return Mentee;
};