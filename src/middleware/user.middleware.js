const { getUserInfo } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExistsError,
} = require('../constant/err.type');

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

module.exports = {
  userValidator,
  verifyUser,
};
