(function() {
	const script = document.createElement('script');
	script.charset = 'UTF-8';
	script.src = chrome.extension.getURL('main/main.js');
	script.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(script);
})();
