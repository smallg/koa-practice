const Router = require('koa-router');
const { register, login, changePwd } = require('../controller/user.controller');
const {
  userValidator,
  verifyUser,
  verifyLogin,
  cryptPwd,
} = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');

const router = new Router({ prefix: '/users' });

router.post('/register', userValidator, verifyUser, cryptPwd, register);
router.post('/login', userValidator, verifyLogin, login);
router.patch('/', auth, cryptPwd, changePwd);

module.exports = router;
