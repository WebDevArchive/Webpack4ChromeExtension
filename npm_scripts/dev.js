var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");
var devConfig = require('./webpack/webpack.config.js')('dev');

console.log('Webpack: watch');
var compiler = webpack(devConfig);
compiler.watch({
	// poll: true
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

console.log('Webpack: dev-server');
new webpackDevServer(webpack(devConfig), {
	publicPath: devConfig.output.publicPath,
	https: true,
	watchOptions: {
		aggregateTimeout: 50,
		// poll: true
	},
	hot: true,
	quiet: false,
	noInfo: false,
	stats: {
		colors: true,
	}
}).listen(devConfig.dev.port, devConfig.dev.host, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening at ' + devConfig.output.publicPath);
	}
})