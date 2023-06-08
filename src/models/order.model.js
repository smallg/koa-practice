const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Order = seq.define('orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'user id',
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'address id',
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'goods info',
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: 'order total',
  },
  order_number: {
    type: DataTypes.CHAR(15),
    allowNull: false,
    comment: 'order number',
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: 'order status',
  },
});

Order.sync({ force: false, alter: false });

module.exports = Order;