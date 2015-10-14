var env = 'build';
var path = require("path");
var webpack = require('webpack');
var config = require('./../webpack/webpack.config')(env);
console.log('Webpack ENV: ', env, '\n-------------------');

config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));

var compiler = webpack(config);
compiler.run(function (err, stats) {
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