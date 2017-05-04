var http = require('http');
var url = require('url');

function start(route, handler){

	function onRequest(req, res){
		var postData = "",
			pathname = url.parse(req.url).pathname;
		console.log('Request for ' +  pathname + ' received');
		route(handler, pathname, res, req);
		// req.setEncoding('utf8');		
		// req.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log('received POST data chunk' + postDataChunk + '.')
		// });
		// req.addListener('end', function(){
		// 	route(handler, pathname, res, postData);
		// })
	}
	http.createServer(onRequest).listen(8888);
	console.log('server has started');
}

exports.start = start;