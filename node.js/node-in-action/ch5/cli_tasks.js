var fs = require('fs'),
	path = require("path"),
	args = process.argv.splice(2),
	command = args.shift(),
	taskDescription = args.join(' '),
	file = path.join(process.cwd(), './tasks');

function loadOrInitializeTaskArray(file, cb) {
	fs.exists(file, function(exists){
		var tasks = [];
		if(exists) {
			fs.readFile(file, 'utf8', function(err, data){
				if(err) throw err;
				var data = data.toString();
				var tasks = JSON.parse(data || '[]');
				cb(tasks);
			});
		} else {
			cb([]);
		}
	})
}