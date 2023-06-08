const { DataTypes }  = require('sequelize');
const seq = require('../db/seq');

const Address = seq.define('address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'user id',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'consignee',
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: 'phone',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'address',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'is default address'
  }
});

Address.sync( {force: false, alter: false});

module.exports = Address;