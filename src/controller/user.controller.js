class UserController {
  async register(ctx, next) {
    ctx.body = 'user register';
  }

  async login(ctx, next) {
    console.log(ctx.request);
    ctx.body = 'user login';
  }
}

module.exports = new UserController();