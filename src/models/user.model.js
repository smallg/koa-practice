const { Sequelize, DataTypes, Model } = require('sequelize');
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
  },
  {
    // tableName: 'users',
    // timestamps: false,
  }
);

User.sync({ force: true, alter: false });

module.exports = User;
