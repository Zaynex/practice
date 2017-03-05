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


// 有些场景需要先发布，后订阅
// 比如QQ离线聊天消息，离线消息保存在服务器，接收人登录后才重新接受这条消息

var Event = (function(){
	var global = this,
		Event,
		_default = 'default';

	Event = function(){
		var _listen,
			_trigger,
			_remove,
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype._unshift,
			namespaceCache = {},
			_create,
			find,
			each = function(ary, fn) {
				var ret;
				for(var i = 0, l = ary.length; i < l; i++) {
					var n = ary[i];
					ret = fn.call(n, i, n);
				}
		
				return ret;
			};

			_listen = function(key, fn, cache) {
				if(!cache[key]) {
					cache[key] = []
				}
				cache[key].push(fn);
			};

			_remove = function(key, cache, fn) {
				if(cache[key]) {
					if(fn) {
						for(var i = cache[key].length; i >=0; i--) {
							if(cache[key][i]=== fn) {
								cachep[key].splice(i, 1);
							}
						}
					}
				}else {
					cache[key] = []
				}
			};

			_trigger = function(){
				var cache = _shift.call(arguments),
					key = _shift.call(arguments),
					args = arguments,
					_self = this,
					ret,
					stack = cache[key];

				if(!stack || !stack.length) {
					return
				}

				return each(stack, function(){
					return this.apply(_self, args)
				})
			};

			_create = function(namespace) {
				var namespace = namespace || _default;
				var cache = {},
					offlineStack = [],
					ret = {
						listen: function(key, fn, last) {
							_listen(key, fn, cache);
							if(offlineStack === null) {
								return
							}
						}
						if(last === 'last') {
							offlineStack.length && offlineStack.pop()();
						}else {
							each(offlineStack, function(){
								this();
							})
						}
						offlineStack = null;
					},
					one: function(key, fn, last) {
						_remove(key, cache);
						this.listen(key, fn, last);
					},
					remove: function(key, fn) {
						_remove(key, cahce, fn);
					},
					trigger: function(){
						var fn,
							args,
							_self = this;

							_unshift.call(arguments, cache);
							args = arguments;
							fn = function(){
								return _trigger.apply(_self, args);
							};

							if(offlineStack) {
								return offlineStack.push(fn);
							}
							return fn();
					};
					return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
			}
		return {
			create: _create,
			one: function(key, fn, last) {
				var event = this.create();
					event.one(key, fn, last);
			},
			remove: function(key, fn) {
				var event = this.create();
				event.remove(key, fn);
			},
			listen: function(key, fn, last) {
				var event = this.create();
					event.listen(key, fn, last);
			},
			trigger: function(){
				var event = this.create();
				event.trigger.apply(this, arguments);
			}
		}
	}()
	return Event;
})();



// 发布订阅模式可以方便在不同模块之间进行通信。但缺点是使用过多后模块间通信相对杂乱，不好维护。