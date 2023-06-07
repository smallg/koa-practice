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

  async removeGood(id) {
    const res = await Good.destroy({ where: { id } });

    return res > 0;
  }

  async restoreGood(id) {
    const res = await Good.restore({ where: { id } });

    return res > 0;
  }

  async findGoods(pageNum, pageSize) {
    // const count = await Good.count();
    const offset = (pageNum - 1) * pageSize;
    // const rows = await Good.findAll({offset, limit: pageSize * 1});

    const { count, rows } = await Good.findAndCountAll({
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

  async findGood(good_id) {
    const res = await Good.findOne({ where: { id: good_id } });
    
    return res;
  }
}

module.exports = new GoodService();
