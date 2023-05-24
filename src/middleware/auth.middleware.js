const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, invalidToken } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error(error.message);
        ctx.app.emit('error', tokenExpiredError, ctx);
        return;
      case 'JsonWebTokenError':
        console.error(error.message);
        ctx.app.emit('error', invalidToken, ctx);
        return;
    }
  }
  await next();
};

module.exports = {
  auth,
};
