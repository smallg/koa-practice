const Address = require('../models/address.model');

class AddressService {
  async createAddress(params) {
    return await Address.create(params);
  }

  async findAllAddress(user_id) {
    return await Address.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: { user_id },
    });
  }

  async findOneAddress(id, user_id) {
    return await Address.findOne({ where: { user_id, id } });
  }

  async updateAddress(id, address) {
    return await Address.update(address, { where: { id } });
  }

  async removeAddress(id) {
    return await Address.destroy({ where: { id } });
  }

  async setAddressDefault(id, userId) {
    await Address.update({ is_default: false }, { where: { user_id: userId } });
    return await Address.update({ is_default: true }, { where: { id } });
  }
}

module.exports = new AddressService();
