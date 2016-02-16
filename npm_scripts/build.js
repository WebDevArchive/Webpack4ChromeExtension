var webpack = require('webpack');
var buildConfig = require('./webpack/webpack.config.js')('build');

console.log('Webpack: Build ','\n--------------');
var compiler = webpack(buildConfig);
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
