'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentee extends Model {
    static associate(models) {
      // define association here

      this.belongsTo(models.User, { foreignKey: 'user_id'});  // this is the user_id in the mentee table and has one to one relationship with the user table
      this.belongsTo(models.Team, { foreignKey: 'team_id'}); // this is the team_id in the mentee table and has many to one relationship with the team table
    }
  }
  Mentee.init({
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
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'teams', 
        key: 'id',
      },
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Mentee',
    tableName: 'mentees'
  });
  return Mentee;
};