'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Query extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Query, { foreignKey: 'reply_id' });
      this.belongsTo(models.Team, { foreignKey: 'team_id' });
    }
  }
  Query.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reply_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'queries',
        key: 'id'
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Query',
    tableName: 'queries'
  });
  return Query;
};