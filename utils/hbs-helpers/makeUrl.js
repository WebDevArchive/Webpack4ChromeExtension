module.exports = function(text) {
	var protocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
      , scheme   = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	text = text.replace( protocol, '<a href="$1" target="_blank">$1</a>');
	text = text.replace( scheme,   '$1<a href="http://$2" target="_blank">$2</a>' );
	return text;
};


