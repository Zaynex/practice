var http = require("http"),
	server = http.createServer();

server.on('request', function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end();
})
server.listen(8000);
console.log('listen 8000 port');