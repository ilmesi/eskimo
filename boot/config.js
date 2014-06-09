
// # config

var path = require('path')

var pkg = require(path.join(__dirname, '..', 'package'))
var assetsDir = path.join(__dirname, '..', 'assets')
var publicDir = path.join(assetsDir, 'public')
var viewsDir = path.join(__dirname, '..', 'views')
var maxAge = 24 * 60 * 60 * 1000

exports = module.exports = function() {

  return {

    defaults: {
      pkg: pkg,
      mongooseVersioning: true,
      showStack: true,
      // directories
      assetsDir: assetsDir,
      publicDir: publicDir,
      // views
      views: {
        dir: viewsDir,
        engine: 'jade'
      },
      session: {
        secret: 'igloo-change-me',
        key: 'igloo',
        cookie: {
          maxAge: maxAge
        }
      },
      trustProxy: true,
      updateNotifier: {
        enabled: true,
        dependencies: {},
        updateCheckInterval: 1000 * 60 * 60,
        updateCheckTimeout: 1000 * 20
      },
      staticServer: {
        maxAge: maxAge
      },
      server: {
        host: 'localhost',
        cluster: false,
        ssl: {
          enabled: false,
          options: {}
        }
      },
      cookieParser: 'igloo-change-me',
      csrf: {
        cookie: {
          signed: true,
          maxAge: maxAge
        }
      },
      mongo: {
        host: 'localhost',
        port: 27017,
        opts: {},
        // faster - don't perform 2nd request to verify
        // log message was received/saved
        safe: false
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: maxAge
      },
      output: {
        handleExceptions: true,
        colorize: true,
        prettyPrint: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false,
      },
      less: {
        path: publicDir,
        options: {
          force: true
        }
      },
      jade: {
        amd: {
          path: '/js/tmpl/',
          options: {}
        }
      }
    },

    development: {
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        db: 'igloo-development',
      },
      redis: {
        prefix: 'igloo-development'
      }
    },

    production: {
      showStack: false,
      updateNotifier: {
        enabled: false,
      },
      server: {
        env: 'production',
        port: 80,
        cluster: true
      },
      mongo: {
        db: 'igloo-production',
      },
      redis: {
        prefix: 'igloo-production'
      },
      output: {
        colorize: false
      },
      logger: {
        'console': true,
        requests: false,
        mongo: true,
        // <https://github.com/flatiron/winston#file-transport>
        file: {
          filename: '/var/log/igloo.log',
          // TODO: maxsize
          // TODO: maxFiles
          timestamp: true
        }
      }
    }

  }

}

exports['@singleton'] = true
