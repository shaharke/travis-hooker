module.exports = function (app) {

  // Travis hook route
  var travis = require('../app/controllers/travis');
  app.post('/travis/hook', travis.hook);
};