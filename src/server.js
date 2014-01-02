/**
 * Module dependencies.
 */
var express = require('express')

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config')

var app = express();

//express settings
require('./config/express')(app);

//Bootstrap routes
require('./config/routes')(app);

//Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port, function() {
  console.log('Travis hooker started on port ' + port);
});

exports = module.exports = app;
