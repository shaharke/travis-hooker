var path = require('path');
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
	port: process.env.PORT || 3001,
    db: "mongodb://shahar:travis@paulo.mongohq.com:10057/travis-hooker"
}
