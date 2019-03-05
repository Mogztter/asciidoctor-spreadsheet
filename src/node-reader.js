const fs = require('fs')

const read = function (path) {
  return fs.readFileSync(path, 'utf-8')
}

module.exports.read = read
