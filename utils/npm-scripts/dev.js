var env = 'dev';
var path = require("path");
var webpack = require('webpack');
var config = require('./../webpack/webpack.config')(env);
console.log('Webpack ENV: ', env, '\n-----------------');

var ChromeExtensionLiveReloadPlugin = require('./../webpack/ChromeExtensionLiveReloadPlugin/ChromeExtensionLiveReloadPlugin');
config.plugins.push(
	new ChromeExtensionLiveReloadPlugin({
		chunkName: 'background',
		checkInterval: 200,
		tabReload: true,
		timestampFilename: 'build.timestamp'
	})
);
config.devtool = "inline-source-map";

var compiler = webpack(config);
compiler.watch({
//	poll: true
}, function(err, stats) {
	console.log(stats.toString({
		assets: true,
		chunks: false,
		colors: true,
		hash: false,
		modules: false,
		reasons: false,
		source: false,
	}));
});