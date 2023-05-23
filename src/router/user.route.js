const Router = require('koa-router');
const { register, login } = require('../controller/user.controller');
const {
  userValidator,
  verifyUser,
  verifyLogin,
  cryptPwd,
} = require('../middleware/user.middleware');

const router = new Router({ prefix: '/users' });

router.post('/register', userValidator, verifyUser, cryptPwd, register);
router.post('/login', userValidator, verifyLogin, login);

module.exports = router;
