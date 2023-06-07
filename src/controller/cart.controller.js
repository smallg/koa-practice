const { createOrUpdate, findCarts } = require('../service/cart.service');

class CartController {
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const good_id = ctx.request.body.good_id;
    console.log(user_id, good_id);
    const res = await createOrUpdate(user_id, good_id);
    ctx.body = {
      code: 0,
      message: 'add cart successfully',
      result: res,
    };
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;

    const res = await findCarts(pageNum, pageSize);
    ctx.body = {
      code: 0, 
      message: 'get carts successfully',
      result: res,
    }
  }
}

module.exports = new CartController();
