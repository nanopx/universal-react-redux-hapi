require('babel-core/register')();
require('babel-polyfill');

/**
 * Define universal constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./src/server');
} else {
  if (require('piping')({
    hook: true,
    includeModules: false,
    usePolling: true,
  })) {
    module.exports = require('./src/server');
  }
}
