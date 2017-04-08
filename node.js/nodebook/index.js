// 偏函数
var toString = Object.prototype.toString;

var isType = function(type) {
	return function(obj) {
		return toString.call(obj) === '[object ' + type + ']';
	}
}

var isString = isType('String');
// var isFunction = isType('Function');

console.log(isString('demo'));


// 异步方案

// import Events from 'events'

// let eventsCenter = {
//     events: null,

//     init: function() {
//         this.events = new Events();
//         this.events.setMaxListeners(100)
//     },

//     trigger: function(events, arg) {
//         this.events.emit(events, arg);
//     },
//     off: function(event) {
//         this.events.removeAllListeners(event)
//     },
//     offEvents: function(events) {
//         const ctx = this
//         events.forEach(v => {
//             ctx.events.removeAllListeners(v)
//         })
//     },
//     on: function(events, callback) {
//         this.events.on(events, callback);
//     }
// }
// export default eventsCenter

// 偏函数实现 after效果，确保所有responses返回后再执行callback
var after = function (times, callback){
	var count = 0, results = {};
	return function(key, value) {
		results[key] = value;
		count++;
		if(count === times) {
			callback(results)
		}
	}
}

//underscore的实现
_after = function(times, func){
	return function() {
		if(--times < 1) {
			return func.apply(this, arguments);
		}
	}
}

function a(){
	console.log('after a() 3 times, i come')
}
var afterA = _after(3, a);
afterA()
afterA()

afterA();// after a() 3times, i come 第三次完成后执行








