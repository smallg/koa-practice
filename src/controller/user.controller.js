const { createUser } = require('../service/user.service');

class UserController {
  async register(ctx, next) {
    const { username, pwd } = ctx.request.body;
    const res = await createUser(username, pwd);
    console.log('register', res)
    ctx.body = 'user register';
  }

  async login(ctx, next) {
    // ctx.body = 'user login';
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();