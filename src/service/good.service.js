const Good = require('../models/good.model');

class GoodService {
  async createGood(good) {
    const res = await Good.create(good);
    return res.dataValues;
  }

  async updateGood(id, good) {
    const res = await Good.update(good, { where: { id } });
    
    return res[0] > 0;
  }
}

module.exports = new GoodService();
