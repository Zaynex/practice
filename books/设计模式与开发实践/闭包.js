var Type = {}
for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
	(function(type){
		Type['is' + type] = function(obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']';
		}
	})(type)
}

console.log(Type.isArray([]));
console.log(Type.isString('str'));


// node.js 深入浅出node.js
var toString = Object.prototype.toString;

var isType = function(type) {
	return function(obj) {
		return toString.call(obj) === '[object ' + type + ']';
	}
}

var isString = isType('String');
// var isFunction = isType('Function');

console.log(isString('demo'));



var mult = function(){
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++) {
		a = a * arguments[i]
	}
}



var cache = {};
var mult = function(){
	var args = Array.prototype.join.call(arguments, ',');
	if(cache[args]) {
		return cache[args]
	}
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++) {
		a = a *arguments[i];
	}
	return cache[args] = a;
}



var mult = (function(){
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments, ',');
		if(args in cache) {
			return cache[args]
		}
		var a = 1;
		for(var i = 0, l = arguments.length; i < l; i++) {
			a = a *arguments[i];
		}
		return cache[args] = a;
	}
})()
