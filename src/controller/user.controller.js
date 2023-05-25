const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserInfo,
  updateUserInfo,
} = require('../service/user.service');
const { userLoginError, registerError } = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');

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
      ctx.app.emit('error', registerError, ctx);
    }
  }

  async login(ctx, next) {
    const { username } = ctx.request.body;
    try {
      const { pwd, ...res } = await getUserInfo({ username });
      const token = jwt.sign(res, JWT_SECRET, { expiresIn: '1d' });
      const tokenRes = await updateUserInfo({ id: res.id, token });
      console.log('fk', tokenRes);
      if (tokenRes) {
        ctx.body = {
          code: 0,
          message: 'user login successful',
          result: {
            token,
          },
        };
      } else {
        ctx.body = {
          code: 1,
          message: 'login failed',
          result: '',
        };
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userLoginError, ctx);
    }
  }

  async changePwd(ctx, next) {
    const id = ctx.state.user.id;
    const pwd = ctx.request.body.pwd;
    console.log(id, pwd);
    const res = await updateUserInfo({ id, pwd });
    if (res) {
      ctx.body = {
        code: 0,
        message: 'change password successful',
        result: '',
      };
    } else {
      ctx.body = {
        code: 1,
        message: 'change password failed',
        result: '',
      };
    }
  }
}

module.exports = new UserController();
