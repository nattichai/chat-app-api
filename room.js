const utilRepo = require('./my-util');

const roomRepo = {
  getUsersOfRoom: ctx => {
    const roomId = ctx.params.id;
    const rooms = utilRepo.read('room.txt');
    const users = utilRepo.read('user.txt');
    if (rooms.includes(roomId)) {
      ctx.response.status = 200;
      ctx.response.body = users.filter(user => user.room_id === roomId).map(user => user.user);
    } else {
      ctx.response.status = 404;
      ctx.response.body = '"Room does not exist"';
    }
  },
  userJoinRoom: ctx => {
    const roomId = ctx.params.id;
    const userName = ctx.request.body.user;
    const rooms = utilRepo.read('room.txt');
    const users = utilRepo.read('user.txt');
    if (rooms.includes(roomId)) {
      if (users.filter(user => user.room_id === roomId && user.user === userName).length) {
        ctx.response.status = 200;
        ctx.response.body = {};
      } else {
        const newUsers = users.concat({
          user: userName,
          room_id: roomId
        });
        utilRepo.write('user.txt', newUsers);
        ctx.response.status = 201;
        ctx.response.body = {};
      }
    } else {
      const newRooms = rooms.concat(roomId);
      const newUsers = users.concat({
        user: userName,
        room_id: roomId
      });
      utilRepo.write('room.txt', newRooms);
      utilRepo.write('user.txt', newUsers);
      ctx.response.status = 201;
      ctx.response.body = {};
    }
  },
  userExitRoom: ctx => {
    const roomId = ctx.params.id;
    const userName = ctx.request.body.user;
    const users = utilRepo.read('user.txt');
    if (users.filter(user => user.room_id === roomId && user.user === userName).length) {
      const newUsers = users.filter(user => user.room_id !== roomId || user.user !== userName);
      utilRepo.write('user.txt', newUsers);
      ctx.response.status = 200;
      ctx.response.body = '"' + userName + " leaves the room" + '"';
    } else {
      ctx.response.status = 404;
      ctx.response.body = '"User id is not found"';
    }
  }
}

module.exports = roomRepo;