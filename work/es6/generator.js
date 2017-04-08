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


//yield 产出的意思
// 构造一个迭代器it控制这个生成器
var it = foo();
it.next(); //启动了生成器*foo()，并运行生成器的第一行 x++
//*foo()在yield语句处暂停，在这一点上第一个it.next()调用结束。此时 *foo()仍在运行并且活跃的，只是处于暂停状态
x;	
bar();
x;
it.next(); // 调用it.next从暂停处恢复了生成器*foo() 的执行，并运行console.log


Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
，即遍历器对象（Iterator Object）。
下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。



yield 语句就是暂停标志。
1. 遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
2. 下次调用next方法时并且传入相应的参数，暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值就是next中传入的参数
3. 如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。


function *f(){
	console.log('执行了')
}

var generator = f()
setTimeout(function(){
	generator.next()
},2000)

function *fibonacci(){
	let [prev, curr] = [0, 1];
	for(;;) {
		[prev, curr] = [curr, prev+curr];
		yield curr
	}
}
for(let n of fibonacci()){
	if(n > 1000) break;
	console.log(n)
}



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

function *main() {
	try{
		var text = yield foo(11, 21)
		console.log(text)
	}
	catch(err) {
		console.log(err)
	}
}

//运行生成器
va it = main()

var p = it.next().value

p.then(function(text){
	it.next(text)
}, function(err){it.throw(err)})



function run(gen){
	var args = [].slice.call(arguments, 1), it;

	// 在当前上下文中初始化生成器
	it = gen.apply(this, args)

	// 返回一个promise用于生成器完成
	return Promise.resolve()
		.then(function handleNext(value){
			// 对下一个yield出的值运行
			var next = it.next(value)

			return (function handleResult(next){
				//生成器运动完毕了吗
				if(next.done) {
					return next.value
				} else {
					return Promise.resolve(next.value).then(handleNext,

						function handleErr(err){
							return Promise.resolve(it.throw(err)).then(handleResult)
						})
				}
			})(next);
		})
}





//  实在看不懂了，重新看下es6的文档

var it = makeIterator(['a', 'b'])

it.next()

function makeIterator(array){
	var nextIndex = 0
	return {
		next: function() {
			return nextIndex < array.length ?
			{value: array[nextIndex++], done: false} : {value: undefined, done: true}
		}
	}
}


function *foo(){
	var r1 = yield request('http://some.url.1')
	var r2 = yield request('http://some.url.2')

	var r3 = yield request('http://some.url.3?v='+r1 + ',' + r2)
	console.log(r3)
}
run(foo)

// 这种方式的缺陷就是 它们是依次执行的，请求完url1之后，再请求 url2
// 我们希望它们是并行发出的

function *foo(){
	var p1 = request('http://some.url.1');
	var p2 = request('http://some.url.2');

	var r1 = yield p1;
	var r2 = yield p2;
	var r3 = yield request('http://some.url.3?v='+r1 + ',' + r2);
	console.log(r3)	
}

run(foo)

// p1 和 p2 是并发执行（即“并行”）的用于 Ajax 请求的
// promise。哪一个先完成都无所谓，因为 promise 会按照需要在决议状态保持任意长时间

// 然后我们使用接下来的两个 yield 语句等待并取得 promise 的决议（分别写入 r1 和 r2 ）。如果 p1 先决议，那么 yield
// p1 就会先恢复执行，然后等待 yield p2 恢复。如果 p2 先决议，它就会耐心保持其决议值等待请求，但是 yield p1 将
// 会先等待，直到 p1 决议。
// 不管哪种情况，p1 和 p2 都会并发执行，无论完成顺序如何，两者都要全部完成，然后才会发出 r3 = yield request..
// Ajax 请求。

function *foo(){
	var results = yield Promise.all([
			request('http://some.url.1'),
			request('http://some.url.1')
		]);
	var r1 = results[0];
	var r2 = results[1];
	var r3 = yield request('http://some.url.1?v=' +r1 +','+r2 )
	console.log(r3)
}
run(foo)




委托

function *foo() {
	console.log("foo stating");
	yield 3;
	yield 4;
	console.log("foo finished");
}

function *bar() {
	yield 1;
	yield 2;
	yield *foo();
	yield 5;
}

var it = bar();
it.next().value // 1
it.next().value // 2
it.next().value // foo stating 3

it.next().value // 4
it.next().value // foo finished 5


function *foo() {
	console.log("inside *foo():", yield "B");
	console.log("inside *foo():", yield "C");

	return "D";
}

function *bar(){
	console.log("inside *bar():", yield "A");
	console.log("inside *bar()", yield *foo());
	console.log("inside *bar()", yield "E")
	return "F";
}

var it = bar();
console.log("outside:", it.next().value);

console.log("outside:", it.next(1).value);

console.log("outside:", it.next(2).value);

console.log("outside:", it.next(3).value);

console.log("outside:", it.next(4).value);

