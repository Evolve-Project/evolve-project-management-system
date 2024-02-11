'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' }); // this is the user_id in the mentor table and has one to one relationship with the user table
      this.belongsTo(models.Project, { foreignKey: 'project_id' }); // this is the project_id in the mentor table and has many to one relationship with the project table
      this.hasMany(models.Attendance, { foreignKey: 'mentor_id' }); // this is the mentor_id in attendance table. Each Mentor can have many Attendances
      this.hasMany(models.MenteeFeedback, { foreignKey: 'mentor_id' }); // this is the mentor_id in mentee_feedback table. Each Mentor can have many MenteeFeedbacks
      this.hasMany(models.MentorFeedback, { foreignKey: 'mentor_id' }); // this is the mentor_id in mentor_feedback table. Each Mentor can have many MentorFeedbacks
      
    }
  }
  Mentor.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Mentor',
    tableName: 'mentors'
  });
  return Mentor;
};