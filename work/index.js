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