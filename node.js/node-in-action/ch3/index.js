var http = require('http'),
	fs = require("fs");

http.createServer(function(req, res){
	if(req.url === '/') {
		fs.readFile('./content.json',  function(err, data){
			if(err) {
				console.log(err);
				res.end('Server error');
			} else {
				var titles = JSON.parse(data.toString())
				console.log(titles);
				fs.readFile('./template.html', function(err, data){
					if(err) {
						console.log(err);
						res.end('Server error')
					} else {
						var temp = data.toString();
						// watch it ----------------------------->|
						var html = temp.replace('%', titles.join('</li><li>'))
						res.writeHead(200, {'Content-Type':'text/html'});
						res.end(html);
					}
				})
			}
		})
	}
}).listen(8000)

// var server = http.createServer(function(req, res) {
// 	getTitles(res);
// }).listen(8000);

// function getTitles(res){
// 	if(err) {
// 		console.log('err');
// 	} else {
// 		getTemplate();
// 	}
// }
// function getTemplete(){
// 	//...
// }