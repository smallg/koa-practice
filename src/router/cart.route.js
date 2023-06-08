const Router = require('koa-router');
const router = new Router({ prefix: '/carts' });

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');
const { validatorGoodId } = require('../middleware/goods.middleware');

const {
  add,
  update,
  findAll,
  remove,
  selectOrUnselectAll,
} = require('../controller/cart.controller');

router.post('/', auth, validator({ good_id: 'number' }), validatorGoodId, add);

router.get('/', auth, findAll);

router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
);

router.delete('/', auth, validator({ ids: 'array' }), remove);

router.post(
  '/change-select-status',
  auth,
  validator({ selectedAll: 'boolean' }),
  selectOrUnselectAll
);

module.exports = router;
