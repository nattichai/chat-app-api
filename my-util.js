const fs = require('fs');

const util = {
  read: (fileName) => {
    return JSON.parse(fs.readFileSync(fileName, (err => err && console.log(err))));
  },

  write: (fileName, obj) => {
    fs.writeFileSync(fileName, JSON.stringify(obj), err => err && console.log(err));
  },
};

module.exports = util;
