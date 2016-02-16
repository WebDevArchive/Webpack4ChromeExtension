var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var host = "localhost";
var port = 3000;
var PackageJson = require(path.resolve('./package.json'));

var getWebpackConfig = function (env) {
	var config = {
		entry: {
			content: [path.resolve('./app/src/content/content.js')],
			injected: [path.resolve('./app/src/injected/injected.js')],
			background: [path.resolve('./app/src/background/background.js')],
			options: [path.resolve('./app/src/options/options.js')],
			popup: [path.resolve('./app/src/popup/popup.js')]
		},
		output: {
			path: path.resolve("./app/build"),
			filename: "[name]/[name].js",
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					query: {
						presets: ['es2015']
					},
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract(
						'style-loader!',
						'css?sourceMap!' + 'sass?sourceMap'
					)
				}
			]
		},
		plugins: [
			new ExtractTextPlugin("./[name]/[name].css", {allChunks: true, disable: (env === 'dev')}),

			new webpack.DefinePlugin({
				__PACKAGEJSON__: JSON.stringify(PackageJson),
				__ENV__: JSON.stringify(env)
			}),			

			new HtmlWebpackPlugin({
				filename: 'background/background.html',
				template: './app/src/background/background.ejs',
				PackageJson: PackageJson,
				inject: false
		  	}),

			new HtmlWebpackPlugin({
				filename: 'options/options.html',
				template: './app/src/options/options.ejs',
				PackageJson: PackageJson,
				inject: false
		  	}),

			new HtmlWebpackPlugin({
				filename: 'popup/popup.html',
				template: './app/src/popup/popup.ejs',
				PackageJson: PackageJson,
				inject: false
			}),

			new HtmlWebpackPlugin({
				filename: 'manifest.json',
				template: './app/src/manifest.json.ejs',				
				PackageJson: PackageJson,
				ENV: env,
				inject: false
			}),

			new webpack.NoErrorsPlugin()
		],
	};

	if (env === 'dev') {
		config.plugins.push(new webpack.HotModuleReplacementPlugin());
		config.dev = {
			host: host,
			port: port
		};
		config.output.publicPath = 'https://' + host + ':' + port + '/';
		config.entry.injected.unshift(
			'webpack-dev-server/client?' + config.output.publicPath,
			'webpack/hot/only-dev-server'
		);
		config.entry.background.unshift(
			'webpack-dev-server/client?' + config.output.publicPath,
			'webpack/hot/only-dev-server'
		);
		config.devtool = "inline-source-map";
	} else {
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
	}

	return config;
};

module.exports = getWebpackConfig;