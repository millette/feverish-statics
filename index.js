'use strict'

const pkg = require('./package.json')

const after = (server, next) => {
  const addRoute = (what) => {
    const config = { handler: { directory: { path: `./assets/${what}/` } } }
    if (what === 'js') { config.auth = false }
    server.route({
      method: 'GET',
      path: `/${what}/{param*}`,
      config: config
    })
  }

  ['css', 'img', 'js'].forEach(addRoute)
  /*
  server.route({
    method: 'GET',
    path: '/css/{param*}',
    handler: { directory: { path: './assets/css/' } }
  })

  server.route({
    method: 'GET',
    path: '/img/{param*}',
    handler: { directory: { path: './assets/img/' } }
  })

  server.route({
    method: 'GET',
    path: '/js/{param*}',
    config: {
      auth: false,
      handler: { directory: { path: './assets/js/' } }
    }
  })
  */
  next()
}

exports.register = (server, options, next) => {
  server.dependency(Object.keys(pkg.dependencies).filter((x) => pkg.notHapiPlugins.indexOf(x) === -1), after)
  next()
}

exports.register.attributes = {
  name: pkg.name,
  version: pkg.version
}
