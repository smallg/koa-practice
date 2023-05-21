const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

const userRouter = require('../router/user.route');

app.use(userRouter.routes());

module.exports = app;