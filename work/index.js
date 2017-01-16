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

