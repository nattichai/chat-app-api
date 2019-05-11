const fs = require('fs');

const util = {
  read: (fileName) => {
    try {
      return JSON.parse(fs.readFileSync(fileName, (err => err && console.log(err))));
    } catch (err) {
      fs.writeFileSync(fileName, [], err => err && console.log(err));
      return [];
    }
  },

  write: (fileName, obj) => {
    fs.writeFileSync(fileName, JSON.stringify(obj), err => err && console.log(err));
  },
};

module.exports = util;
