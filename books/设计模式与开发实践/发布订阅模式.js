var event = {
	clientList: [],
	listen: function(key, fn){
		if(!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},

	trigger: function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length == 0) {
			return false
		}

		for(var i = 0, fn; fn = fns[i++]; ) {
			fn.apply(this, arguments);
		}
	}
}
event.remove = function(key, fn) {
	var fns = this.clientList[key];
	if(!fns) {// 如果key对应的消息没有被订阅，那就直接返回
		return false
	}
	if(!fn) { // 如果没有传入具体的回调函数，表示取消订阅所有
		fns && (fns.length = 0);
	}else {
		for(var l = fns.length - 1; l >= 0; l--) {
			var _fn = fns[l];
			if(_fn === fn) {
				fns.splice(l, 1);
			}
		}
	}
}

var installEvent = function(obj) {
	for(var i in event) {
		obj[i] = event[i];
	}
}


var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('square88', fn1 =  function(price){
	console.log("价格 = " + price);
})
salesOffices.remove('square88', fn1)
salesOffices.trigger('square88', 3000);


var Event = (function(){
	var clientList = {},
		listen,
		trigger,
		remove;

	listen = function(key, fn) {
		if(!clientList[key]) {
			clientList[key] = [];
		}
		clientList[key].push(fn);
	}

	trigger = function() {
		var key = Array.prototype.shift.call(arguments);
		fns = clientList[key];
		if(!fns || fns.length === 0) {
			return false
		}
		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	}

	remove = function(key, fn){
		var fns = clientList[key];
		if(!fns) {
			return false
		}
		if(!fn) {
			fns && (fns.length = 0);
		}else {
			for(var l = fns.length; l >= 0; l--) {
				if(fns[i] === fn) {
					fns.splice(l, 1);
				}
			}
		}
	}

	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	}
})()


Event.listen('square888', function(price){
	console.log('888价格是 ' + price)
})

// Event.remove('square888')
Event.trigger('square888', 300000);