const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
const koaStatic = require('koa-static');

const errorHandler = require('./error.handle');
const router = require('../router/index');
const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 50 * 1024 * 1024 * 1024,
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../uploads'),
    },
}));

// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/goods.route');

// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(koaStatic(path.join(__dirname, '../uploads')));
app.use(router.routes())
app.use(router.allowedMethods());

app.on('error', errorHandler);

module.exports = app;