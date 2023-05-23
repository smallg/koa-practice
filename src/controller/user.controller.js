const { createUser } = require('../service/user.service');
const { registerError } = require('../app/error.handle');
class UserController {
  async register(ctx, next) {
    const { username, pwd } = ctx.request.body;
    try {
      const res = await createUser(username, pwd);
      ctx.body = {
        code: 0,
        message: 'user register successful',
        result: {
          id: res.id,
          username: res.username,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', registerError, ctx)
    }
  }

  async login(ctx, next) {
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();
