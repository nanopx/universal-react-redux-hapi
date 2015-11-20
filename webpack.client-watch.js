var webpack = require('webpack');
var config = require('./webpack.client.js');

var hostname = process.env.HOSTNAME || 'localhost';
var port = process.env.PORT ? process.env.PORT + 30 : 3030;

config.cache = true;
config.debug = true;
config.devtool = 'eval';

config.entry.unshift(
	`webpack-dev-server/client?http://${hostname}:${port}`,
	'webpack/hot/only-dev-server'
);

config.output.publicPath = `http://${hostname}:${port}/dist/`;
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin,
	new webpack.NoErrorsPlugin()
];

config.module.loaders =  [
	{
    test: /\.jsx?$/,
		exclude: /node_modules/,
    loader: 'babel',
    query: {
			presets: ['react', 'es2015', 'stage-0']
    }
  }
];

config.devServer = {
	publicPath: `http://${hostname}:${port}/dist/`,
	contentBase: './static',
	hot: true,
	inline: true,
	lazy: false,
	quiet: true,
	noInfo: false,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true},
	host: hostname,
	port: port,
};

module.exports = config;
