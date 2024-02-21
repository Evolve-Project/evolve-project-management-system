'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.Mentee, { foreignKey: 'user_id' });
      this.hasOne(models.Mentor, { foreignKey: 'user_id' });
      this.hasMany(models.Query, { foreignKey: 'user_id' }); // this is the user_id in query table. Each User can have many Queries
      this.hasMany(models.Feedback, { foreignKey: 'given_to_user_id' }); // a user can have many feedbacks given to them
      this.hasMany(models.Feedback, { foreignKey: 'given_by_user_id' }); // a user can give many feedbacks
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Mentor', 'Mentee'),
      allowNull: false,
      defaultValue: 'Mentee'

    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};