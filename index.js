const koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const app = new koa();
const router = new koaRouter();
const port = 3000;

const utilRepo = require('./my-util');
const allRoomRepo = require('./all-room');
const roomRepo = require('./room');
const userRepo = require('./user');

router.get('/ping', ctx => {
  utilRepo.write('test.txt', 'pong');
  ctx.response.body = utilRepo.read('test.txt');
});

router.get('/allrooms', allRoomRepo.getAllRoom);
router.post('/allrooms', allRoomRepo.createRoom);
router.put('/allrooms', allRoomRepo.updateRoom);
router.del('/allrooms', allRoomRepo.deleteRoom);

router.get('/room/:id', roomRepo.getUsersOfRoom);
router.post('/room/:id', roomRepo.userJoinRoom);
router.put('/room/:id', roomRepo.userJoinRoom);
router.del('/room/:id', roomRepo.userExitRoom);

router.get('/users', userRepo.getUsers);

app.use(koaBodyParser());
app.use(router.routes());
app.listen(port);