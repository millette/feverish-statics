'use strict'

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
  next()
}

const pkg = require('./package.json')

exports.register = (server, options, next) => {
  server.dependency(Object.keys(pkg.dependencies), after)
  next()
}

exports.register.attributes = {
  name: pkg.name,
  version: pkg.version
}
