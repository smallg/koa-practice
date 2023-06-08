const { cartFormatError } = require('../constant/err.type');
const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectOrUnselectAll,
} = require('../service/cart.service');

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
    };
  }

  async update(ctx) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;

    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number or selected can not null';
      ctx.app.emit('error', cartFormatError, ctx);
    }

    const res = await updateCarts({ id, num: number, selected });

    ctx.body = {
      code: 0,
      message: 'update cart successfully',
      result: res,
    };
  }

  async remove(ctx) {
    const { ids } = ctx.request.body;
    const res = await removeCarts(ids);

    ctx.body = {
      code: 0,
      message: 'remove cart successfully',
      result: res,
    };
  }

  async selectOrUnselectAll(ctx) {
    const user_id = ctx.state.user.id;
    const { selectedAll } = ctx.request.body;
    const res = await selectOrUnselectAll(user_id, selectedAll);
    ctx.body = {
      code: 0,
      message: 'select all successfully',
      result: res,
    };
  }
}

module.exports = new CartController();
