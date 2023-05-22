const User = require('../models/user.model');

class UserService {
  async createUser(username, pwd) {
    const res = await User.create({ username, pwd });
    return res.dataValues;
  }

  async getUserInfo({ id, username, password, isAdmin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    password && Object.assign(whereOpt, { password });
    isAdmin && Object.assign(whereOpt, { isAdmin });

    const res = await User.findOne({
      attributes: ['id', 'username', 'pwd', 'isAdmin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
}

module.exports = new UserService();
