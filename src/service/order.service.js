const Order = require('../models/order.model');

class OrderService {
  async createOrder(order) {
    return await Order.create(order);
  }

  async findAllOrder(params) {
    const { user_id, status, pageNum, pageSize } = params;
    const { count, rows } = await Order.findAndCountAll({
      attributes: ['goods_info', 'total', 'order_number', 'status'],
      where: {
        user_id,
        status,
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  async updateOrder(id, user_id, status) {
    return await Order.update({ status }, { where: { user_id, id } });
  }
}

module.exports = new OrderService();
