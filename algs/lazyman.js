function _lazyman(name) {
	this.task = [];
	var self = this;
	var fn = (function(n){
		var name = n;
		return function() {
			console.log("this is a" + name + "!")
			self.next()
		}
	})(name);

	this.task.push(fn);
	setTimeout(function(){
		self.next()
	}, 0)
}
_lazyman.prototype.next = function() {
	var fn = this.task.shift();
	fn && fn();
}
_lazyman.prototype.eat = function() {
	var self = this;
	var fn = (function(name){
		return function(){
			console.log("eat" + name + "!")
		}
	})(name);
	this.task.push(fn);
	return this;
}
_lazyman.prototype.sleep = function(time) {
	var self = this;
	var fn  = (function(time) {
		return function(){
			setTimeout(function(){
				console.log("wake up" + time +　"!")
				self.next()
			}, time * 1000)
		}
	})
}

_lazyman.prototype.sleepFirst = function(time) {
	var self = this;
	var fn = (function(time){
		return function(){
			setTimeout(function() {
				console.log("wake up atfter " + time + "!")
				self.next();
			}, time * 1000)
		}
	})(time)
	this.task.unshift(fn)
	return this

}

function LazyMan(name){
	return new _lazyman(name);
}