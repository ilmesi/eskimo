
// # etc - init - middlware

var winstonRequestLogger = require('winston-request-logger')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var expressResource = require('express-resource')

exports = module.exports = function(IoC, logger, settings) {

  var app = this

  // winston request logger before everything else
  // but only if it was enabled in settings
  if (settings.logger.requests)
    app.use(winstonRequestLogger.create(logger))

  // integrate express-resource
  app = expressResource(app)

  // parse request bodies
  app.use(bodyParser())

  // support _method (PUT in forms etc)
  app.use(methodOverride())

}

exports['@require'] = [ '$container', 'igloo/logger', 'igloo/settings' ]
