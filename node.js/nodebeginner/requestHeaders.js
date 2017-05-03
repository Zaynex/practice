var exec = require('child_process').exec;

function start(response, postData){
	console.log('Request handler "start" was called');
	var content = 'empty';

	var body = 
	`<html>
		<head>
		<meta http=-equiv="Content-Type" content="text/html" charset="UTF-8"/>
		</head>
		<body>
			<form action="/upload" method="POST">
				<textarea name="text" id="" cols="60" rows="30"></textarea>
				<input type="submit" value="Submit text"/>
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

function upload(response){
	console.log('Request handler "upload" was called');
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello upload');
	response.end();
}

exports.start = start;
exports.upload = upload;

