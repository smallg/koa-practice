const { createOrder, findAllOrder, updateOrder } = require('../service/order.service');

class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = 'wp' + Date.now();

    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 0,
      message: 'Order created',
      result: res,
    };
  }

  async findAll(ctx) {
    const user_id = ctx.state.user.id;
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query;
    const res = await findAllOrder({ user_id, pageNum, pageSize, status });
    ctx.body = {
      code: 0,
      message: 'order list successfully found',
      result: res,
    };
  }

  async update(ctx) {
    const user_id = ctx.state.user.id;
    const id = ctx.request.params.id;
    const status = ctx.request.body.status;

    const res = await updateOrder(id, user_id, status);
    ctx.body = {
      code: 0,
      message: 'order update successfully updated',
      result: res,
    };
  }
}

module.exports = new OrderController();
