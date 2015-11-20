require('babel-core/register')();
require("babel-polyfill");

/**
 * Define universal constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({hook: true, includeModules: false})) {
    return;
  }
}

module.exports = require('./src/server');
