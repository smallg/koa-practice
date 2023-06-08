const { createAddress, findAllAddress, updateAddress, removeAddress, setAddressDefault } = require('../service/address.service');

class AddressController {
  async addAddress(ctx) {
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;
    const res = await createAddress({ user_id, consignee, phone, address });
    ctx.body = {
      code: 0,
      message: 'Add address successfully',
      result: res,
    }
  }

  async findAll(ctx) {
    const userId = ctx.state.user.id;

    const res = await findAllAddress(userId);
    ctx.body = {
      code: 0,
      message: 'get address successfully',
      result: res,
    }
  }

  async updateAddress(ctx) {
    const id = ctx.request.params.id;
    const res = await updateAddress(id, ctx.request.body);
    ctx.body = {
      code: 0,
      message: 'update address successfully',
      result: res,
    };
  }

  async remove(ctx) {
    const id = ctx.request.params.id;
    const res = await removeAddress(id);
    ctx.body = {
      code: 0,
      message: 'remove address successfully',
      result: res,
    };
  }

  async setDefault(ctx) {
    const id = ctx.request.params.id;
    const userId = ctx.state.user.id;
    const res = await setAddressDefault(id, userId);
    ctx.body = {
      code: 0,
      message: 'set address default',
      result: res,
    };
  }
}

module.exports = new AddressController();
