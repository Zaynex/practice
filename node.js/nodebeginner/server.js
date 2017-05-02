var http = require('http');
var url = require('url');

function start(route, handler){

	function onRequest(req, res){
		var pathname = url.parse(req.url).pathname;
		console.log('Request for ' +  pathname + ' received');
		
		route(handler, pathname, res);
	}
	http.createServer(onRequest).listen(8888);
	console.log('server has started');
}

exports.start = start;