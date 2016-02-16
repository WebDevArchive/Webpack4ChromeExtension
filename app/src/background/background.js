console.log('@W4CE: background.js');

/*
// Reload the extension when "webpackHotUpdate" was triggered from any place: 
// "content", "injected", "background", "popup", "options".
window.addEventListener('message', (e) => {
	if (e.data.indexOf('webpackHotUpdate') != -1) {
		chrome.runtime.reload();
	}
});
*/

/*
// Reload the extension only when "background" was changed.
if (module.hot) {
	module.hot.accept();
	if (module.hot.data !== undefined) {
		chrome.runtime.reload();
	}
}

// TODO: appending this code automatically (by `npm run dev --forceReloadExtension`).
*/

