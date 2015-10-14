var fs = require('fs');
var path = require("path");
var RawSource = require("webpack/lib/RawSource");
var Handlebars = require('handlebars');

function ChromeExtensionLiveReloadPlugin(options) {
	this.options = options || {};
}

ChromeExtensionLiveReloadPlugin.prototype.apply = function(compiler) {
	var self = this;

	compiler.plugin("emit", function(compilation, callback) {

		compilation.chunks.some(function(chunk) {			
			if (chunk.name === self.options.chunkName) {

				var buildTimestamp = Date.now().toString();
				console.log('buildTimestamp', buildTimestamp);

				// inject content to background.js
				if (chunk.rendered) {
					var hbs = require('./reloadExtension.js.hbs');
					var reloadExtension = "\n" + hbs(self.options);
					compilation.assets[chunk.files[0]].children.push(reloadExtension);
				}

				// update timestamp-file
				var chunkDir = path.dirname(chunk.files[0]);
				compilation.assets[path.join(chunkDir, self.options.timestampFilename)] = new RawSource(buildTimestamp);

				return true;
			}
		});


		callback();
	});
};

module.exports = ChromeExtensionLiveReloadPlugin;