var x = 1
function foo(){
	x++;
	bar()
	console.log("x:", x)
}

function bar(){
	x++
}
foo()




var x = 1
function *foo(){
	x++;
	yield;
	console.log("x:", x)
}

function bar(){
	x++
}
// 构造一个迭代器it控制这个生成器
var it = foo();
it.next(); //启动了生成器*foo()，并运行生成器的第一行 x++
//*foo()在yield语句处暂停，在这一点上第一个it.next()调用结束。此时 *foo()仍在运行并且活跃的，只是处于暂停状态
x;	
bar();
x;
it.next(); // 调用it.next从暂停处恢复了生成器*foo() 的执行，并运行console.log



接受参数

function *foo(x, y){
	console.log(x + y)
}
var it = foo(5,7);
var res = it.next();
console.log(res)



迭代消息传递：
生成器提供了内建消息输入输出的能力，通过yield和next实现。

function *foo(x) {
	var y = x * (yield)
	return y
}
var it = foo(6)
it.next()

var res = it.next(7) // next里的参数就是yield里传入的参数
res.value  //42

function *foo(x) {
	var y = x * (yield + 100)
	return y
}
var it = foo(6)
it.next()

var res = it.next(7) // next里的参数就是yield里传入的参数
res.value // 42

yield 里如果加上一个数还是没有受到影响


一般来说，一个 yield 会需要执行两次 next 
第一次执行到第一个 yield 处，第二个next 调用完成第一个被暂停的yield 表达式。


yield 作为个表达式可以发出消息响应next()调用，next()可以向暂停的yield表达式发送值

function *foo(x){
	var y = x * (yield 'helloworld')
	return y
}

var it = foo(6)
var res = it.next()
res.value // helloworld

res = it.next(7)
res.value // 42



function *foo() {
	var x = yield 2;
	z++
	var y = yield (x * z)
	console.log(x, y, z)
}
var z = 1
var it1 = foo()
var it2 = foo()
var val1 = it1.next().value // 2
var val2 = it2.next().value // 2

val1 = it1.next(val2 * 10).value   // x:20 z:2  40
val2 = it2.next(val1 * 5).value   // x:200 z: 3 600

it1.next(val2 / 2)  // y = 300
					// 20 300 3
it2.next(val1 / 4)  // y= 10
					// 200 10 3

每次next().value 都是yield表达式的值
	

生成器的作用就是让几个函数共享相同的作用域。


var gimmeSomething = (function(){
	var nextVal
	return function () {
		if(nextVal === undefined){
			nextVal = 1
		}else {
			nextVal = ( 2 * nextVal) + 6
		}
		return nextVal
	}
})()

gimmeSomething() // 1
gimmeSomething() // 8

var something = (function(){
	var nextVal

	return {
		[Symbol.iterator]: function(){return this;},
		next: function(){
			if(nextVal === undefined) {
				nextVal = 1;
			}else {
				nextVal = (3 * nextVal) + 6
			}
			return {done:false, value: nextVal}
		}
	}
})();

something.next().value // 1

for(var v of something) {
	console.log(v)
	if(v > 400){
		break
	}
}

var a = [1,3,5,7,9]
for(var v of a){
	console.log(v)
}
for of 是自动调用它的Symbol.iterator函数创建一个迭代器
我们也可以手动调用，使用它返回的迭代器

var a = [1,3,5,7,9]
var it = a[Symbol.iterator]();
it.next().value //1
it.next().value //3
it.next().value //5


function *something(){
	try{
		var nextVal

		while(true) {
			if(nextVal == undefined) {
				nextVal = 1
			}else {
				nextVal = ( 3 * nextVal ) + 6
			}
			yield nextVal
		}
	}
	finally {
		console.log('cleanning up')
	}
}

var it = something()
for(var v of it){
	console.log(v)

	if(v > 500) {
		console.log(
			it.return('hello world').value
		)
	}
}
// 1 9 33 105 321 969 
// cleanning up 
//hello world


调用it.return() 之后会终止生成器。把返回的value设置为传入到return里的内容。




// 异步迭代生成器

function foo(x, y, cb){
	ajax('http://some.url.1?x=' + x + "&y=" + y,
		cb);
}

foo(11, 31, function(err, text){
	if(err) {
		console.log(err)
	}else {
		console.log(text)
	}
})

function foo(x,y){
	ajax('http://some.url.1?x=' + x + "&y=" + y,

	function(err,data){
		if(err){
			it.throw(err)
		}else {
			it.next(data)
		}
	});
}

function *main(){
	try{
		var text = yield foo(11, 31)
		console.log(text)
	} catch(err){
		console.log(err)
	}
}

var it = main()
it.next()


在yield foo(11, 31) 中，首先调用foo(11,31),它没有返回值(undefined)，因此我们发出一个调用请求数据实际返回的是 yield undfined


这段代码中  text 的yield返回的值就是 it.next(data)异步获取了 ajax的数据。
本质上把异步作为实现细节抽象了出去，使得我们可以以同步顺序的形式追踪流程控制。


有了yield, try catch 就可以捕捉到异步的错误了。

function *main(){
	var x = yield 'hello world';
	yield x.toLowerCase()
}
var it = main()
it.next().vaue

try {
	it.next(42)
}
catch(err) {
	console.error(err)
}


生成器+Promise 最重要的一点就是
yield出一个Promise，然后通过这个Promise控制生成器的迭代器

function foo(x, y) {
	return request('http://some.url.1/?x=' + x "&y=" + y)
}

function