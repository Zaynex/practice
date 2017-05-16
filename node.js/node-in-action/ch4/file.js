// enctype设定为 multipart/form-data 适用于大型二进制的MIME类型
var http =require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res){
	switch(req.method) {
		case 'GET':
			show(req, res);
			break;
		case 'POST':
			uploda(req, res);
			break;
	};
});

function show(req, res){
	var html = `
		<form action="/" method='POST' enctype="multipart/form-data">
			<p><input type="text" name="name" /></p>
			<p><input type="text" name='file' /></p>
			<p><input type="file" value="upload"/></p>
		</form>
	`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html))
	res.end(html);
}

function upload(req, res){
	if(!isFormData(req)) {
		res.statusCode = 400;
		res.end('Bad Request: expecting multipart/form-data')
		return;
	}
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		console.log(fields);
		console.log(files);
		res.end('upload complete');
	});
}

function isFormData(req) {
	var type = req.headers['content-type'] || '';
	return 0 === type.indexOf('multipart/form-data');
}

