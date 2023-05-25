const User = require('../models/user.model');

class UserService {
  async createUser(username, pwd) {
    const res = await User.create({ username, pwd });
    return res.dataValues;
  }

  async getUserInfo({ id, username, pwd, isAdmin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    pwd && Object.assign(whereOpt, { pwd });
    isAdmin && Object.assign(whereOpt, { isAdmin });

    const res = await User.findOne({
      attributes: ['id', 'username', 'pwd', 'isAdmin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  async updateUserInfo({ id, username, pwd, isAdmin, token }) {
    const whereOpt = { id };
    const newUser = {};

    username && Object.assign(newUser, { username });
    pwd && Object.assign(newUser, { pwd });
    isAdmin && Object.assign(newUser, { isAdmin });
    token && Object.assign(newUser, { token });
    console.log('sb', newUser)

    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0;
  }
}

module.exports = new UserService();
