require("file?name=icons/[name].[ext]!./../icons/16.png");
require("file?name=icons/[name].[ext]!./../icons/32.png");
require("file?name=icons/[name].[ext]!./../icons/48.png");
require("file?name=icons/[name].[ext]!./../icons/128.png");

	chrome.tabs.getSelected(null, function(tab) {
		var code = 'window.location.reload();';
		chrome.tabs.executeScript(tab.id, {code: code});
	});


var curVersionTimestamp = Date.now();
var xhr = new XMLHttpRequest();
setInterval (function () {
	xhr.open('GET', '../lastbuild.timestamp', false);
	xhr.send();
	if (xhr.status != 200) {
		console.log( xhr.status + ': ' + xhr.statusText );
	} else {
		//var newVersionTimestamp = JSON.parse(xhr.responseText).version_name;
		console.log(xhr.responseText, curVersionTimestamp);
		if (xhr.responseText > curVersionTimestamp) {
			console.log('reload');
			curVersionTimestamp = xhr.responseText;
			chrome.management.getSelf(function(ExtensionInfo) {
				chrome.runtime.reload();
			});
		}
	}
}, 300);

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log('tabId:', tabId);
	console.log('changeInfo:', changeInfo);
	console.log('tab:', tab);
	console.log('-----------------------------');
	if (changeInfo.status === 'loading') {
		console.log('@reload ext');
		chrome.runtime.reload();
	}
});
*/
//alert('1');
//console.log('2');