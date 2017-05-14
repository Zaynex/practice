function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

var events = require('events'),
	fs = require('fs'),
	util = require('util');

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function() {
	var watcher = this;
	fs.readFile(this.watchDir, function(err, files){
		if(err) {
			console.log(err)
		} else {
			for(var index in files) {
				watcher.emit('process', files[index])
			}
		}
	})
}

Watcher.prototype.start = function() {
	var watcher = this;
	fs.watchFile(watchDir, function(){
		watcher.watch();
	})
}