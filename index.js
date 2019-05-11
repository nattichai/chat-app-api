const koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const app = new koa();
const router = new koaRouter();
const port = 3000;

const utilRepo = require('./my-util');
const allRoomRepo = require('./all-room');

router.get('/ping', ctx => {
  utilRepo.write('test.txt', 'pong');
  ctx.response.body = utilRepo.read('test.txt');
});

app.use(koaBodyParser());
app.use(router.routes());
app.listen(port);