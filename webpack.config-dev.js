import webpack from 'webpack';
import * as config from './webpack.config';

const {GLOBALS} = config;

config.cache = true;
config.debug = true;
config.devtool = 'eval';

config.entry.unshift(
  'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true'
);

config.output.publicPath = '/dist/';
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

config.module.preLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  },
];

config.module.eslint = {
  configFile: './.eslintrc',
};

export default config;
