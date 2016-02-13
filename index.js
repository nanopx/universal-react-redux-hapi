require('babel-register')();
require('babel-polyfill');

/**
 * Define universal constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV === 'production') {
  console.info('Initializing the production server.'); // eslint-disable-line no-console
  require('./src/server.js').default((server) => {
    server.start(() => {
      console.info('==> ✅  Server is listening'); // eslint-disable-line no-console
      console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase()); // eslint-disable-line no-console
    });
  });
} else {
  console.info('Initializing the development server. This may take a while...'); // eslint-disable-line no-console
  require('./webpack.server.js').default((server) => {
    server.start(() => {
      console.info('==> ✅  Server is listening'); // eslint-disable-line no-console
      console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase()); // eslint-disable-line no-console
    });
  });
}
