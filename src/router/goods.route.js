const Router = require('koa-router');
const { upload, create, update } = require('../controller/goods.controller');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/goods.middleware');

const router = new Router({ prefix: '/goods' });

router.post('/upload', auth, isAdmin, upload);

router.post('/', auth, isAdmin, validator, create);

router.put('/:id', auth, isAdmin, validator, update);

module.exports = router;
