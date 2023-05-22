const { createUser, getUserInfo } = require('../service/user.service');

class UserController {
  async register(ctx, next) {
    const { username, pwd } = ctx.request.body;
    if (!username || !pwd) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'username or password is empty',
        result: null,
      };
      return;
    }
    if (await getUserInfo({ username })) {
      ctx.status = 409;
      ctx.body = {
        code: 409,
        message: 'username already exists',
        result: null,
      };
      return;
    }

    const res = await createUser(username, pwd);
    ctx.body = {
      code: 0,
      message: 'user register successful',
      result: {
        id: res.id,
        username: res.username,
      },
    };
  }

  async login(ctx, next) {
    // ctx.body = 'user login';
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();
