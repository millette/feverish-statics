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
