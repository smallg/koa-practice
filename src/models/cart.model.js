const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const Good = require('./good.model');

const Cart = seq.define('carts', {
  good_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'good id',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'user id',
  },
  num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: 'good num',
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'good select status',
  }
});

Cart.belongsTo(Good, {
  foreignKey: 'good_id',
  as: 'good_info',
})

Cart.sync({ force: false, alter: false });

module.exports = Cart;