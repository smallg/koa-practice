const Router = require('koa-router');
const router = new Router( {prefix: '/carts'});

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');
const { validatorGoodId } = require('../middleware/goods.middleware');

const { add } = require('../controller/cart.controller')
const { findAll } = require('../controller/cart.controller');

router.post('/', auth, validator, validatorGoodId, add);

router.get('/', auth, findAll);

module.exports = router;