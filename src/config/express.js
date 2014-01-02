/**
 * Module dependencies.
 */
var express = require('express'),
  cons = require('consolidate'),
  config = require('./config');

module.exports = function (app, db) {
  app.set('showStackError', true);

  //Don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    app.engine('jade', cons.jade);
    app.set('view engine', 'jade');
    app.set('views', config.root + '/app/views');

    //Assume 404 since no middleware responded
    app.use(function (req, res, next) {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });

  });
};
