const Router = require('koa-router');
const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/goods.middleware');

const router = new Router({ prefix: '/goods' });

router.post('/upload', auth, isAdmin, upload);

router.post('/', auth, isAdmin, validator, create);

router.put('/:id', auth, isAdmin, validator, update);

router.delete('/:id', auth, isAdmin, remove);

router.post('/:id/off', auth, isAdmin, remove);

router.post('/:id/on', auth, isAdmin, restore);

router.get('/', auth, findAll);

module.exports = router;
