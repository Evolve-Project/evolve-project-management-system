'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' }); // this is the user_id in the mentor table and has one to one relationship with the user table
      this.belongsTo(models.Team, { foreignKey: 'team_id' }); // this is the team_id in the mentor table and has many to one relationship with the team table
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
    modelName: 'Mentor',
    tableName: 'mentors'
  });
  return Mentor;
};