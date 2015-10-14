var webpack = require('webpack');
var path = require("path");

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PackageJson = require('./../../package.json');
var Handlebars = require('handlebars');

Handlebars.registerHelper('ifCond', require('./../hbs-helpers/ifCond'));

var currentDateTime = require('./getCurrentDateTime.js')();
console.log("Compile: " + currentDateTime);

var config = function (env) {
	return {
		context: path.resolve("./app/src"),
		entry: {
			index: path.resolve('./app/src/index.js'),
			main: path.resolve('./app/src/main/main.js'),
			background: path.resolve('./app/src/chrome/background/background.js'),
			options: path.resolve('./app/src/chrome/options/options.js'),
			popup: path.resolve('./app/src/chrome/popup/popup.js')
		},
		output: {
			path: path.resolve("./app/dist"),
			filename: "./[name]/[name].js"
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: ['babel-loader'],
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				},
				{
					test: /\.hbs$/,
					loader: 'handlebars-loader',
					query: {
						helperDirs: [
							__dirname + '/../hbs-helpers'
						]
					}
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
					exclude: path.resolve('./app/src/chrome/manifest.json')
				},
			]
		},
		plugins: [

			new ExtractTextPlugin("./[name]/[name].css", {}),

			new HtmlWebpackPlugin({
				filename: 'background/background.html',
				PackageJson: PackageJson,
				templateContent: function(templateParams, webpackCompiler) {
	      				var hbs = require(path.resolve('./app/src/chrome/background/background.hbs'));
	      				return hbs(templateParams);
		    		}
	  		}),

			new HtmlWebpackPlugin({
				filename: 'options/options.html',
				PackageJson: PackageJson,
				templateContent: function(templateParams, webpackCompiler) {
	      				var hbs = require(path.resolve('./app/src/chrome/options/options.hbs'));
		      			return hbs(templateParams);
	    			}
	  		}),

			new HtmlWebpackPlugin({
				filename: 'popup/popup.html',
				PackageJson: PackageJson,
				templateContent: function(templateParams, webpackCompiler) {
		      			var hbs = require(path.resolve('./app/src/chrome/popup/popup.hbs'));
		      			return hbs(templateParams);
		    		}
	  		}),

			new HtmlWebpackPlugin({
				filename: 'manifest.json',
				PackageJson: PackageJson,
				env: env,
				templateContent: function(templateParams, webpackCompiler) {
					var hbs = require(path.resolve('./app/src/chrome/manifest.json.hbs'));
		      			return hbs(templateParams);
		    		}
	  		})
		],
	};
}

module.exports = config;