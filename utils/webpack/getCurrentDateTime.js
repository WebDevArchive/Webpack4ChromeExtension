module.exports = function getCurrentDateTime() {
	date = new Date();
	var dd = date.getDate();
	if (dd < 10) dd = '0' + dd;
	var mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;
	var yy = date.getFullYear();
	if (yy < 10) yy = '0' + yy;
	var hh = date.getHours();
	if (hh < 10) hh = '0' + hh;
	var min = date.getMinutes();
	if (min < 10) min = '0' + min;
	var sec = date.getSeconds() % 100;
	if (sec < 10) sec = '0' + sec;
	return dd + '.' + mm + '.' + yy + ' | ' + hh + ':' + min + ':' + sec;
}