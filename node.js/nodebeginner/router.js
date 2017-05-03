function route(handler, pathname, response, postData){
	console.log('About to route a request for ' + pathname);
	if(typeof handler[pathname] === 'function') {
		handler[pathname](response, postData);
	}else {
		console.log('No request handler found for ' + pathname);
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('404 Not Found ');
		response.end();
	}
}
exports.route = route;