const utilRepo = require('./my-util');

const userRepo = {
  getUsers: ctx => {
    const users = utilRepo.read('user.txt');
    ctx.response.status = 200;
    ctx.response.body = [...new Set(users.map(user => user.user))];
  }
}

module.exports = userRepo;