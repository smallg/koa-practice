const Router = require('koa-router');
const router = new Router({ prefix: '/address' });

const { auth } = require('../middleware/auth.middleware');
const { validator, isValidAddress } = require('../middleware/address.middleware');

const {
  addAddress,
  findAll,
  updateAddress,
  remove,
  setDefault,
} = require('../controller/address.controller');

router.post(
  '/',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^1\d{10}$/,
    },
    address: 'string',
  }),
  addAddress
);

router.get('/', auth, findAll);

router.put(
  '/:id',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^1\d{10}$/,
    },
    address: 'string',
  }),
  updateAddress
);

router.delete('/:id', auth, remove);

router.patch('/:id', auth, isValidAddress, setDefault);

module.exports = router;
