const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const User = seq.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'user name',
    },
    pwd: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: 'user password',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'user is admin',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'user token',
    }
  },
  {
    // tableName: 'users',
    // timestamps: false,
  }
);

User.sync({ force: false, alter: true });

module.exports = User;
