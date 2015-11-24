import Webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';
import config from './webpack.config-dev';
import buildServer from './src/server';

const compiler = new Webpack(config);

// webpack-dev-middleware options
// See https://github.com/webpack/webpack-dev-middleware
const assets = {
  hot: true,
  publicPath: '/dist',
  contentBase: 'static',
  // inline: false,
  // lazy: false,
  // quiet: true,
  // noInfo: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
};

// webpack-hot-middleware options
// See https://github.com/glenjamin/webpack-hot-middleware
const hot = {
  timeout: '20000',
  reload: true,
};

export default function initialize(cb) {
  // wrap server for development
  buildServer((server) => {
    server.register({
      register: WebpackPlugin,
      options: { compiler, assets, hot },
    }, (err) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
      }

      // Hot reloading for client-side sources, for the server.
      // Delete the cached client modules and re-require at the next request.
      compiler.plugin('done', () => {
        console.log('Clearing src/ module cache from server'); // eslint-disable-line no-console
        Object.keys(require.cache).forEach((id) => {
          if (/\/src\//.test(id)) delete require.cache[id];
        });

        // Start the server, only when the server is not initialized
        if (server.info.started === 0) {
          return cb(server);
        }
      });
    });
  });
}
