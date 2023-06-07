const Cart = require('../models/cart.model');
const Good = require('../models/good.model');
const { Op } = require('sequelize');

class CartService {
  async createOrUpdate(user_id, good_id) {
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          good_id,
        },
      },
    });

    if (res) {
      await res.increment('num');
      return await res.reload();
    }
    {
      return await Cart.create({
        user_id,
        good_id,
      });
    }
  }

  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'num', 'selected'],
      include: {
        model: Good,
        as: 'good_info',
        attributes: ['id', 'good_name', 'good_price', 'good_img'],
      },
      offset,
      limit: pageSize * 1,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new CartService();
