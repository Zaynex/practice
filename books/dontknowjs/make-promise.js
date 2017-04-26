/**
 * useage
 */


function Promise(fn){
	var callback;

	this.then(function(done){
		callback = done;
	})

	function resolve(){
		callback();
	}
	fn(resolve)
}

function Promise(fn) {
	var promise = this,
		value = null;
		promise._resolve = [];

	this.then = function(onFullfilled) {
		promise._resolve.push(onFullfilled);
		return this;
	};

	function resolve(value) {
		promise.resolve.forEach(function(callback){
			callback(value);
		})
	}
	fn(resolve);
}