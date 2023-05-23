const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./error.handle');

const app = new Koa();

app.use(bodyParser());

const userRouter = require('../router/user.route');

app.use(userRouter.routes());

app.on('error', errorHandler);

module.exports = app;