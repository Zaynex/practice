var exec = require('child_process').exec;
var querystring = require("querystring"),
	fs = require('fs'),
	util = require('util'),
	formidable = require("formidable");

function start(response){
	console.log('Request handler "start" was called');
	var content = 'empty';

	var body = 
	`<html>
		<head>
		<meta http=-equiv="Content-Type" content="text/html" charset="UTF-8"/>
		</head>
		<body>
			<form action="/upload" method="POST" enctype="multipart/form-data" >
				<input type="file" name="upload"/>
				<input type="submit" value="Submit file"/>
			</form>
		</body>	
	</html>`;

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
	// exec('ls -lah', function(err, stdout, stderr){
	// 	response.writeHead(200, {"Content-Type": "text/plain"});
	//     response.write(stdout);
	//     response.end();
	// 	content = stdout;
	// });
}

function upload(response, request){
	console.log('Request handler "upload" was called');
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files){
		console.log('parseing done');
		// fs.renameSync(files.upload.path, './temp/test.jpg');
		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream('./temp/test.jpg');
		readStream.pipe(writeStream);
		readStream.on('end', function(){
			fs.unlinkSync(files.upload.path, './temp/test.jpg');
		})
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('receive image:' + "<br/>");
		response.write("<img src='/show'>");
		// response.write("You've sent:" + querystring.parse(postData).text);
		response.end();
	})
}

function show(response, postData) {
	fs.readFile('./temp/test.jpg', 'binary', function(err, file){
		if(err) {
			response.writeHead('500', {'Content-Type': 'text/plain'});
			response.write(err + '\n');
			response.end();
		}else {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write(file, 'binary');
			response.end();
		}
	})

}
exports.start = start;
exports.upload = upload;
exports.show = show;
