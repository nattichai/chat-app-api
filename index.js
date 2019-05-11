const utilRepo = require('./my-util');
const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = new koaRouter();
const port = 3000;

router.get('/ping', (ctx, next) => {
  utilRepo.write('test.txt', 'pong');
  ctx.response.body = utilRepo.read('test.txt');
});
 
app.use(router.routes())
app.listen(port);