const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./error.handle');
const router = require('../router/index');
const app = new Koa();

app.use(bodyParser());

// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/goods.route');

// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(router.routes())
app.use(router.allowedMethods());

app.on('error', errorHandler);

module.exports = app;