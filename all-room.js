const utilRepo = require('./my-util');

const roomPath = 'room.txt';
const userPath = 'user.txt';

const allRoomRepo = {
  getAllRoom: ctx => {
    const roomInfo = utilRepo.read(roomPath);

    ctx.response.body = roomInfo;
    ctx.response.status = 200;
  },

  createRoom: ctx => {
    const roomId = ctx.request.body['id'];

    const roomInfo = utilRepo.read(roomPath);

    if (roomInfo.includes(roomId)) {
      ctx.response.body = `${roomId} already exists`;
      ctx.response.status = 404;
    } else {
      roomInfo.push(roomId);
      utilRepo.write(roomPath, roomInfo);

      ctx.response.body = { id: roomId };
      ctx.response.status = 201;
    }
  },

  updateRoom: ctx => {
    const roomId = ctx.request.body['id'];

    const roomInfo = utilRepo.read(roomPath);

    if (roomInfo.includes(roomId)) {
      ctx.response.body = { id: roomId };
      ctx.response.status = 200;
    } else {
      roomInfo.push(roomId);
      utilRepo.write(roomPath, roomInfo);

      ctx.response.body = { id: roomId };
      ctx.response.status = 201;
    }
  },

  deleteRoom: ctx => {
    const roomId = ctx.request.body['id'];

    const roomInfo = utilRepo.read(roomPath);
    const userInfo = utilRepo.read(userPath);

    if (roomInfo.includes(roomId)) {
      roomInfo.splice(roomInfo.indexOf(roomId), 1);
      const newUserInfo = userInfo.filter(each => each['room_id'] !== roomId);

      utilRepo.write(roomPath, roomInfo);
      utilRepo.write(userPath, newUserInfo);

      ctx.response.body = `${roomId} is deleted`;
      ctx.response.status = 201;
    } else {
      ctx.response.body = 'Room id is not found';
      ctx.response.status = 404;
    }
  },
};

module.exports = allRoomRepo;