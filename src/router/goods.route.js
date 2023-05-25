const Router = require('koa-router');
const { upload } = require('../controller/goods.controller');
const { auth, isAdmin } = require('../middleware/auth.middleware');

const router = new Router({ prefix: '/goods' });

router.post('/upload', auth, isAdmin, upload);
// router.post('/upload', upload);

module.exports = router;
