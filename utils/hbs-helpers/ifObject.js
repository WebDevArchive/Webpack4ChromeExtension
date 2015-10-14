module.exports = function(data, options) {
	if(typeof data === "object") {
    	return options.fn(this);
  	} else {
	    return options.inverse(this);
  	}
};