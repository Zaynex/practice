// 流，将数据分块传递，而不用等所有数据都全了再做处理
// 类似切片的概念，但是以时间为单位切片
var fs = require("fs"),
	stream = fs.createReadStream('./resource.json');

stream.on('data', function(chunk){
	console.log(chunk + '')
});
console.log('reading');
stream.on('end', function(){
	console.log('finish')
});



// 也可以分批写入数据
var http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type':'image/jpg'});
	fs.createReadStream('./image.jpg').pipe(res);
}).listen(3000);
console.log('server runing at port 3000');