const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = seq.define(
  'goods',
  {
    good_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'good name',
    },
    good_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'user password',
    },
    good_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'good num',
    },
    good_img: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'good image url',
    }
  },
  {
    // tableName: 'users',
    // timestamps: false,
  }
);

Goods.sync({ force: false, alter: false });

module.exports = Goods;
