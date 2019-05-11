const koa = require('koa');
const koaRouter = require('koa-router');

const app = new koa();
const router = new koaRouter();
const port = 3000;

router.get('/ping', (ctx, next) => {
  ctx.response.body = "pong";
});
 
app.use(router.routes())
app.listen(port);