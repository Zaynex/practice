事件循环是将一系列事件放到一个循环队列中（先进先出）去读取。
但是定时器的函数并没有把回调函数放到事件循环队列中，而是在定时时间过后环境将该回调函数放到事件循环队列中。这也是为什么定时器不精确的原因。它只能保证回调函数在设定的时间之后或那一刻开始。
最后运行的时间还要取决于事件队列的状态。


var  res = []
function response(data) {
	res.push(data)
}

ajax('http://some.url.1', response)
ajax('http://some.url.2', response)

如果希望返回的结果res[0]是给url.1的，res[1]是给url.2的，但是这样很可能满足不了。

function response(data) {
	if(data.url === 'http://some.url.1') {
		res[0] = data
	} else if(data.url === 'http://some.url.2') {
		res[1] = data
	}
}



gate
因为不确定是否有值
所以需要做的是

if ( a && b ) //表示 a,b的值都在确定的情况下继续执行

如果第二名没有意义

if(!a) {
	...
}


在实际的开发当中会经常遇到这种情况
需要请求大量的数据。
比如

var res = []
function response(data) {
	res = res.concat(
		data.map(val => val * 2)
	)
} 
ajax('http://url.1',response)
ajax('http://url.2',response)

但是如果数据特别多的情况下，会让一些UI上的事件（比如滚动，点击等）进行漫长的等待。
所以需要一个协作性更强更友好的事件循环队列并发系统，可以异步处理这些结果，每次处理后返回事件循环，让其他等待事件有机会执行。


var res = []

function response(data) {
	var chunk = data.splice(0, 1000)

	res = res.concat(chunk.map(val => val * 2))

	if(data.length > 0) {
		setTimeout(()=> {
			response(data)
		}, 0)
	}
}

使用setTimeout({},0)可以协调进程的调度，把这个函数插入到事件循环队列的结尾。 

类似的方法在Node.js中有 process.nextTick()


任务处理是在当前事件循环tick结尾处，但是定时器触发是为下一个事件循环tick.
Promise用的是任务处理。


doA(function(){
	doB();
	doC(function(){
		doD()
	})
	doE()
})

doF();

执行顺序
doA()
doF()
doB()
doC()
doE()
doD()


理解回调函数的执行顺序


//bad
function addNumber(x,y) {
	return x + y
}

addNumber(21, 21);
addNumber(21,"21");


//strict
function addNumber(x,y) {
	if(typeof x != 'number' || typeof y != 'number') {
		throw Error('bad parameters')
	}
	return x + y
}


//friendly
function addNumber(x, y){
	x = Number(x);
	y = Number(y);

	return x + y
}

addNumber(1,12);
addNumber(1,"12");

对类型检查/规范化的过程特别重要，只有这样才能产生完全信任的代码。

function timeoutify(fn, delay) {
	var intv = setTimeout(function() {
		intv = null
		fn(new Error("timeout!"))
	},delay)

	return function(){
		if(intv) {
			clearTimeout(intv)
			fn.apply(this,arguments)
		}
	}
}



function result(data) {
	console.log(a)
}

var a = 0
ajax('..pre-url', result)
a++;

这段代码的问题是不确定 打印的结果到底是 a = 0 还是 a = 1

使用异步就不会有这个问题。

function asyncify(fn) {
	var orig_fn = fn,
		intv = setTimeout(function() {
			intv = null
			if(fn) fn()
		}, 0);

	fn = null
	return function(){
		// 触发太快，在定时器intv触发指示异步转换前发生？
		if(intv) {
			fn = orig_fn.bind.apply(
				orig_fn,
				[this].concat([].slice.call(arguments))
			)
		}
		//如果已经是异步
		else {
			orig_fn.apply(this, arguments)
		}
	}
}

function result(data) {
	console.log(a)
}

var a = 0

ajax('..pre-url', asyncify(result));
a++


Promise (承诺)

就拿楼下的那家牛肉面馆来说，你点了碗牛肉刀削，交给收银员15元。通过这个场景下单，就是对某个值（牛肉刀削）发起请求，启动了一次交易。
但是我们不能马上得到这碗牛肉刀削，收银员会给我们收据来代替牛肉刀削。这个收据其实就是承诺（promise)。
保证了最终我们会得到牛肉刀削。

所以我们要保存好收据，等到收银员叫号时就咱们吃的就到了。

但是在等待的过程中依然可以做很多事情，比如叫朋友过来一起吃牛肉刀削。

一旦我要的值准备好了（牛肉刀削）,我就用我的promise(收据)换取这个值。
不过还有另外一种状态，就是可能你凭着订单去领的时候告诉你已经刀削已经没了，这个时候就失败了。

所以一共有三种状态，
成功
失败
等待中



Promise特点：
防止回调过早：即便是立即完成的Promise(类似于new Promise(function)((resolve){resolve(42)}))返回的是异步结果。所以不需要再通过setTimeout(...,0)这种hack手段来处理。也就是说即使Promise调用then时,即使Promise已经决议，提供给then的回调函数也会被异步调用。

调用过晚：因为Promise的then()注册的观察回调函数会被自动调度，因此这些被调度的回调在一下个异步事件点上一定会被触发。


p.then(function(){
	p.then(function(){
		console.log("c")
	})
	console.log('b')
})
p.then(function(){
	console.log("a")
})


执行顺序：
b a c

注意点是两个独立的Promise链接上的回调函数的相对顺序是无法预测的。


回调未调用：虽然Promise在决议时总会执行完成回调或拒绝回调的其中一个。但Promise依然提供解决方案，那就是竞态

function timeoutPromise(delay) {
	return new Promise(function(reslove, reject) {
		setTimeout(function() {
			reject('timeout')
		}, delay)
	})
}

Promise.race([
	foo(), timeoutPromise(3000)
	])
	.then(function(){
		//.. 及时完成
	}, function(err) {
		// foo被拒绝
		//查看err了解哪种情况
	})


调用次数过多或者过少： 如果出现多次调用，Promise的定义方式使得它只被决议一次，会忽略后续任意调用。所以，then也 只会被调用一次。

var p = {
	then: function(cb, errcb) {
		cb(42)
		errcb('evil laugh')
	}
}
p.then(
	function fulfilled(val){
		console.log(val)
	},
	function rejected(err) {
		console.log(err)
	}
)

var p = Promise.resolve(42)
Promise.resolve(p)
	.then(function fulfilled(val){
		console.log(val)
	}, function rejected(err){
		console.log(err + '1111')
	})


链式流
1. 不管对Promise调用then()都会创建并返回一个新的Promise
2. 不管从then调用的完成回调返回值是什么，都会被自动设置为链接Promise的完成

var p = Promise.resolve(21)
var p2 = p.then(function(v){
	console.log(v) // 21
	return v * 2
})

p2.then(function(v){
	console.log(v) // 42
})


var rejectedPr = new Promise(function(resolve, reject) {
	resolve(Promise.reject('Oops'))
})
rejectedPr.then(
	function fulfilled(){
		//不会到这里
		console.log('hh')
	},
	function rejected(err) {
		console.log(err)
	})


try...catch 无法支持异步操作，还需要一些额外的环境支持，比如 生成器


// err-fist式的回调风格
function foo(cb) {
	setTimeout(function(){
		try{
			var x = baz.bar()
			cb(null, x)
		}
		catch(err) {
			cb(err)
		}
	}, 100)
}

foo(function(err, val) {
	if(err) {
		console.log(err)
	}else {
		console.log(val)
	}
})

//只有在baz.bar调用会同步立即成功或失败的情况下，try...catch才会生效

// Promise 采用回调分离，一个回调用于处理完成情况，另外一个回调用于拒绝情况


也有问题：
var p = Promise.resolve(32)

p.then(
	function fulfilled(msg){
		//因为数字没有 string函数，所以会抛出错误
		console.log(msg.toLowerCase())
	},
	function rejected(err){
		console.log(err)
		//永远不会到这里
	})

但是这种错误在Promise是里无法获得通知的。因为是在fulfilled里面发生的。前面的Promise p 已经决议生成32了。

这也是Promise错误处理易于出错的问题。

所以一般会在底部加上catch来捕捉决议后fulfilled里产生的错误
var p = Promise.resolve(32)

p.then(
	function fulfilled(msg){
		//因为数字没有 string函数，所以会抛出错误
		console.log(msg.toLowerCase())
	},
	function rejected(err){
		console.log(err)
		//永远不会到这里
	})
	.catch(handleErrors()

function handleErrors(e){
	console.log(e)
}


但是如果最后catch里面的函数也出错那该怎么办？

这倒还真是个坑

不过Promise有done
var p = Promise.resolve(42)
p.then(
	function fulfilled(msg){
		console.log(msg.toLowerCase())
	})
.done(null, handleErrors)
// 如果handleErrors发生异常，会被全局抛出到这里
done不会创建和返回Promise，如果done()的函数内部出现任何异常都会作为一个全局未处理函数抛出




API介绍
如果希望同时发送两个AJAX请求，不管它们以什么顺序全部完成之后再发送第三个AJAX请求
使用 Promise.all
var p1 = request('http://some.url.1')
var p2 = request('http://some.url.2')
Promise.all([p1, p2])
	.then(function(msgs) {
		//把p1和p2完成并将它们的消息传入
		return request('http://some.url.3?v=' + msgs.join(','))
	})
	.then(function(msg){
		console.log(msg)
	})

如果Promise.all返回的promise中任何一个成员被拒绝的话，主Promise.all会被立即拒绝

Promise.race接受单个数组参数。也是由多个Promise,thenable或立即值组成，不过因为是竞态，立即值也没有意义。
如果传一个空数组，Promise永远也不会决议。

//取最先获得数据的那个api
var p1 = request('http://some.url.1')
var p2 = request('http://some.url.2')
Promise.race([p1, p2])
	.then(function(msg){
		return request('http://some.url.3/?v=' + msg)
	})
	.then(function(msg){
		console.log(msg)
	})


finally

如果前面的回调函数里保存了一些要用的资源但因为某种情况出现了超时而被忽略，开发者认为需要一个finally()来注册回调函数，执行必要的清理工作。

finally()会创建并返回一个新的Promise。


//辅助工具
if(!Promise.observe) {
	Promise.observe = function(pr, cb){
		//观察pr的决议
		pr.then(
			function fulfilled(msg){
				//安排异步回调
				Promise.resolve(msg).then(cb)
			}, function rejected(err){
				Promise.resolve(err).then(cb)
			})
	}
	//返回最初的promise
	return pr
}


Promise.race([
	Promise.observe(
		foo(), 
		function cleanup(msg){
			//在foo()之后清理，即使它没有在超时之前完成
		}),
	timeoutPromise(3000)	
])

if(Promise.first) {
	Promise.first = function(prs) {
		return new Promise(function(resolve, reject){
			prs.forEach(function(pr){
				Promise.resolve(pr)	
				.then(resolve)
			})
		})
	}
}

//接受一个数组的值（可以是Promise或者是其他值），外加要在每个值上运行一个函数（任务）作为参数
//map()本身返回一个promise,其完成值是一个数组，该数组保存任务执行之后的异步完成值。
if(!Promise.map) {
	Promise.map = function(vals, cb){
		return Promise.all(
			vals.map(function(val) {
				return new Promise(function(resolve){
					cb(val, resolve)
				})
			}))
	}
}

var p1 = Promise.resolve(32);
var p2 = Promise.resolve(21);
var p3 = Promise.resolve(20);

Promise.map([p1, p2, p3], function(pr,done){
	Promise.resolve(pr)
		.then(
			function(v){
				done(v * 2);
			}, done)
})
.then(function(vals){
	console.log(vals)
})

var p1 = Promise.resolve(42);
var p2 = Promise.resolve('hello world');
var p3 = Promise.reject('Oops');

Promise.race([p1, p2, p3])
	.then(function(msg){
		//哪个promise在前面，就先返回
		console.log(msg) // 42
	})

Promise.all([p1, p2])
	.then(function(msg){
		console.log(msg) //[42, "hello world"]
	})

Promise.all([p1, p2, p3])
	.catch(function(err){
		console.log(err) // Oops
	})

注意;
Promise.all()传入空数组时会立即完成，但Promise.race()会挂住，且永远不会决议。

function getY(x){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve((3*x) -1)
		}, 100)
	})
}


function foo(bar,baz){
	var x = bar * baz

	return getY(x)
			.then(function(y){
				return [x, y]
			})
}

foo(10, 20)
	.then(function(msgs){
		var x = msgs[0];
		var y = msgs[1];

		console.log(x, y); // 200 ,599
})




function getY(x){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve((3*x) -1)
		}, 100)
	})
}
function foo(bar, baz){
	var x = bar * baz
	return [
		Promise.resolve(x),
		getY(x)
	];
}
//返回两个Promise
Promise.all(foo(10, 20))
	.then(function(msgs){
		var x = msgs[0];
		var y = msgs[1];

		console.log(x, y)
	})


//ES6
Promise.all(foo(10, 20))
	.then(function[x, y]{
		console.log(x, y)
	})


//相当于生成Promise的工厂
if(!Promise.wrap){
	Promise.wrap = function(fn){
		return function(){
			var args = [].slice.call(arguments);
			return new Promise(function(resolve, reject){
				fn.apply(null, args.concat(function(err, v){
					if(err){
						console.log(err)
					}else {
						resolve(v)
					}
				}))
			})
		}
	}
}

var request = Promise.wrap(ajax)
request('http:/some.url.1')
	.then()
	..