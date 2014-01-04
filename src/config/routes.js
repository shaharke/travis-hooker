module.exports = function (app, config) {

  // Travis hook route
  var travis = require('../app/controllers/travis');
  app.post('/travis/hook', travis.hook(config));
};