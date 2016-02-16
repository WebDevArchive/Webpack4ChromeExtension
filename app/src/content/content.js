console.log('@W4CE: content.js');
console.log('@W4CE: __ENV__' , __ENV__);
console.log('@W4CE: __PACKAGEJSON__' , __PACKAGEJSON__);

(function() {
	var script = document.createElement('script');
	script.charset = 'UTF-8';
	script.src = chrome.extension.getURL('injected/injected.js');
	script.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(script);

	if (__ENV__ === 'build' ) {
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = chrome.extension.getURL('injected/injected.css');
		(document.head||document.documentElement).appendChild(style);
	}
})();

require("file?name=icons/[name].[ext]!./../icons/16.png");
require("file?name=icons/[name].[ext]!./../icons/32.png");
require("file?name=icons/[name].[ext]!./../icons/48.png");
require("file?name=icons/[name].[ext]!./../icons/128.png");
