const { getUserInfo } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExistsError,
  userNotExistsError,
  userLoginError,
  userPwdInvalidError,
} = require('../constant/err.type');
const bcrypt = require('bcryptjs');

const userValidator = async (ctx, next) => {
  const { username, pwd } = ctx.request.body;
  if (!username || !pwd) {
    // ctx.status = 400;
    // ctx.body = {
    //   code: 400,
    //   message: 'username or password is empty',
    //   result: null,
    // };
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;
  if (await getUserInfo({ username })) {
    // ctx.status = 409;
    // ctx.body = {
    //   code: 409,
    //   message: 'username already exists',
    //   result: null,
    // };
    ctx.app.emit('error', userAlreadyExistsError, ctx);
    return;
  }
  await next();
};

const registerError = async (ctx, next) => {
  ctx.app.emit('error', registerError, ctx);
  return;
};

const verifyLogin = async (ctx, next) => {
  const { username, pwd } = ctx.request.body;
  try {
    const res = await getUserInfo({ username });
    if (!res) {
      console.error('user not exists', username);
      ctx.app.emit('error', userNotExistsError, ctx);
      return;
    }
    if (!bcrypt.compareSync(pwd, res.pwd)) {
      ctx.app.emit('error', userPwdInvalidError, ctx);
      return;
    }

  } catch (err) {
    console.error('user not exists', username);
    ctx.app.emit('error', userLoginError, ctx);
    return;
  }
  
  await next();
};

const cryptPwd = async (ctx, next) => {
  const { pwd } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  console.log(pwd, salt)
  const hash = bcrypt.hashSync(pwd, salt);

  ctx.request.body.pwd = hash;
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  verifyLogin,
  cryptPwd,
};
