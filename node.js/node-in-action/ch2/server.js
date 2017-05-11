var mime = require("mime"),
	chatServer = require('./lib/chat_server'),
	fs = require('fs'),
	path = require('path'),
	http = require('http'),
	cache = {};

function send404(res) {
	res.writeHead(404, {'Content-Type':'text/plain'});
	res.write('Error 404：response not found');
	res.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))})
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if(cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if(exists) {
				fs.readFile(absPath, function(err, data){
					if(err) {
						send404(response)
					}else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				})
			} else {
				send404(response);
			}
		})
	}
}

var server = http.createServer(function(request, response){
	var filePath = false;

	if(request.url == '/') {
		filePath = 'public/index.html'
	} else {
		filePath = 'public' + request.url;
		console.log(request.url + "======= request.url")
	}

	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
})

server.listen(3000, function(){
	console.log('server listening on port 3000')
})
chatServer.listen(server);
