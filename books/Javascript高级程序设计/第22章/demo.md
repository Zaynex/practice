## 高级技巧

### 作用域安全的构造函数
```
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
}

var person = new Person('Zaynex',22,'software Engineer');

var person = Person('Zaynex',22,'software Engineer');
alert(window.name); // Zaynex
alert(window.age);  // 22
alert(window.job);  // software Engineer
```
没有如果使用new操作符来调用构造函数的情况下，由于this对象是在运行时绑定的，所以直接调用Person,this会映射到全局对象window上，导致错误对象属性意外的增加。（污染了window对象）

我们需要采用构建作用域安全的构造函数。
```
function Person(name,age,job) {
	if(this instanceof Person) {
		this.name = name;
		this.gae = age;
		this.job = job;
	} else{
		return new Person(name,age,job);
	}
}
var person = Person('Zaynex',29,'software Engineer');
alert(window.name);//''
alert(person.name);//Zaynex
```
实现这个模式后，就锁定了可以调用构造函数的环境。但如果使用构造函数窃取模式的继承且不使用原型链，那么该继承可能被破坏。
```
function Polygon(sides){
	if(this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	}else {
		return new Polygon(sides);
	}
}

function Rectangle(witdh,height){
	Polygon.call(this, 2);
	this.witdh = witdh;
	this.height = height;
	this.getArea = function(){
		return this.witdh * this.height;
	};
}

var rect = new Rectangle(5,19);
alert(rect.sides);//undefined

```
新创建一个Rectangle实例，该实例通过Polygon，call继承Polygon的sides属性。但是由于Ploygon构造函数作用域是安全的，this对象并非Polygon的实例。所以会创建并返回一个新的Polygon对象。

那么我们可以结合原型链或者寄生组合的形式解决这问题。
```
function Polygon(sides){
	if(this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	}else {
		return new Polygon(sides);
	}
}

function Rectangle(witdh,height){
	Polygon.call(this, 2);
	this.witdh = witdh;
	this.height = height;
	this.getArea = function(){
		return this.witdh * this.height;
	};
}

Rectangle.prototype = new Polygon();

var rect = new Rectangle(5,19);
alert(rect.sides);//2
```
一个Rectangle实例同时也是一个Polygon实例，所以Ploygon.call()会按照意愿执行。


### 惰性载入函数
因为浏览器之间行为的差异，多数JavaScript代码包含了大量if语句。我们来看一个经典的createXHR()函数。
```
function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject != 'undefined') {
		if(typeof arguments.callee.activeXString != "string") {
			var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
			i,len;

			for(i = 0, len = versions.length; i < len; i++) {
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch(ex) {
					//
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}
```
每次调用createXHR()时，它都要对浏览器所支持的能力仔细检查。每次调用该函数都是这样，即使每次调用时分支的结果都不变：如果浏览器支持内置XHR，那么它就一直支持了，这种测试也变得没有必要，即使只有一个if语句的代码，也要比没有if语句的慢。
所以我们可以利用惰性载入让代码不必每次都执行if语句。

```
function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		createXHR = function(){
			return new XMLHttpRequest();
		}
	}else if (typeof ActiveXObject != 'undefined') {
		createXHR = function(){
			if(typeof arguments.callee.activeXString != "string") {
				var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
				i,len;

				for(i = 0, len = versions.length; i < len; i++) {
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch(ex) {
						//
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}
	
	} else {
		createXHR = function(){
			throw new Error("No XHR object available.");
		};
	}
	return createXHR();
}
```
在if豫剧的每个分支都为creatXHR变量赋值。有效覆盖了原有的函数。最后一步就是调用新赋的函数。
下一次就会直接调用被分配的函数，就不需要再次执行if语句了。

第二种实现惰性加载的方式是在声明函数时就指定适当的函数。
```
var createXHR = (function(){
	if(typeof XMLHttpRequest != 'undefined') {
		return function(){
			return new XMLHttpRequest();
		};
	}else if (typeof ActiveXObject != 'undefined') {
		return function(){
			if (typeof arguments.callee.activeXString != "string") {
				var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
				i,len;

				for(i = 0, len = versions.length; i < len; i++) {
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch(ex) {
						//
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}
	
	} else {
		return function(){
			throw new Error("No XHR object available.");
		};
	}
})();
```

惰性载入函数的优点是只在执行分支时牺牲一点性能。至于哪种方式更合适，就看您的具体需求而定了。

### 函数绑定
函数绑定要创建一个函数，可以在特定的this环境中指定参数调用另一个函数。该技巧长长和回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境。

```
var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", handler.handleClick);

```
在上面的例子中创建一个handler对象，handler.handleClick()方法分配给一个DOM按钮的事件处理程序。我们期望按下按钮时调用函数的结果会 在警告框显示 “Event handled”，但实际上显示的是undefined。

这个问题在于没有保存handler.handleClick()的环境，所以this对象最后是指向了DOM按钮而非handler(在IE8中，this指向window)。我们可以使用闭包来修复该问题。

```
var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", function(event){
	handler.handleClick(event);
});
```

我们在onclick事件处理程序内使用了一个闭包直接调用handler.handleClick()。
但创建多个闭包可能会令代码难以理解和调试。因此很多JavaScript库实现了一个可以将函数绑定到特定环境的函数。这个函数一般叫bind()。
```
function bind(fn, context){
	return function(){
		return fn.apply(context, arguments);
	}
};
```
这个功能非常强大。在bind()中创建了一个闭包，闭包使用apply()调用传入的函数，并给apply()传递context对象和参数。注意这里使用的arguments对象是内部函数的，而非bind()的。当调用返回的函数时，它会在给定环境中执行被传入的函数并给出所有参数。
```
var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message + ": " + this.event);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", bind(handler.handleClick, handler));
```

我们用bind()函数创建了一个保持执行环境的函数，并将其传给btn.addEventListener()。event对象也被传给了该函数。
ES5为该函数定义了原生的bind()方法。
传入您要作为this的对象。（IE9+,Firefox4+和Chrome）
关于bind的用法可以参照这篇博文
- [ES5bind用法](http://www.cnblogs.com/zichi/p/4357023.html)
```
var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message + ": " + this.event);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", handler.handleClick.bind(handler));
```
只要将函数指针以值的形式进行传递，同时该函数必须在特定情况下执行，被绑定函数的效用就凸显出来了。但要注意的是被绑定函数与普通函数相比有更多的开销，它们需要更多内存，同时也因为多重函数调用会稍微慢些，所以最好在必要时使用。

### 函数柯里化
它用于创建已经设置好了一个或多个参数的函数。基本方法和函数绑定类似：使用闭包返回一个函数。
两者区别在于，当函数被调用时，返回的函数还需要设置一些传入的参数。
```
function add(num1, num2){
	return num1 + num2;
}

function curriedAdd(num2){
	return add(5, num2);
}
alert(add(2, 3)); //5
alert(curriedAdd(3));//8
```
以上仅展示了函数柯里化的概念.
```
function curry(fn) {
	var args = Array.prototype.slice.call(arguments, 1);
	//取得是传入的第一个参数后的参数——即curry参数中add函数后的参数（5）
	console.log(args);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		//这里取得是返回函数赋值的那个函数的参数(curriedAdd中的3，4)
		console.log(innerArgs);//(5,3,4)
		var finalArgs = args.concat(innerArgs);
		console.log(finalArgs);
		return fn.apply(null, finalArgs);
	};
}

function add(num1, num2){
	return num1+num2;
}
var curriedAdd = curry(add, 5);
alert(curriedAdd(3,4));
//返回的函数赋值给curriedAdd
```
在最后用apply()将结果传递给该函数，注意这个函数没有考虑到执行环境，所以apply()第一个参数为null。

函数柯里化长长作为函数绑定的一部分包含在其中，构造出更为复杂的bind()函数。

```
function bind(fn, context) {
	var args = Array.prototype.slice.call(arguments,2);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	}
}
```
使用bind函数时，会绑定到给定特定环境的函数。
当你除了event对象再额外给事件处理程序传递参数时，这非常有用。
```
var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message + ": " + this.event);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", bind(handler.handleClick, handler, "my-btn"));
```
嗯，不过ES5中的bind()也实现了函数柯里化了，只要在this的值后面再传入另一个参数就好啦！
```
btn.addEventListener("click", handler.handleClick.bind(handler,"my-btn"));


## 定时器
指定的时间间隔表示的是何时将定时器的代码加入到队列，而不是何时实际执行代码。

### 重复的定时器
使用setInterval()创建的定时器确保了定时器代码规则插入队列，但问题是定时器中代码可能再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行了好几次。不过JavaScript引擎能避免该问题。在使用setInterval()时，仅当没有该定时器的任何代码实例时，才将定时器代码加入到队列。

重复定时器的规则有两个问题
1. 某些间隔会跳过
2. 度个定时器的代码执行间隔可能会比预期小

假设某个onclick事件处理程序使用`setInterval()`设置了一个200ms的间隔的重复定时器。如果事件处理程序花了300ms多时间完成，同事定时器代码也花了差不多事件，就会同时出现跳过间隔而连续运行定时器代码的情况。

为避免这种情况，可以使用链式setTimeout()调用。
```javascript
setTimeout(function(){
	setTimeout(arguments.callee, interval);
},interval)
```
这样做的好处是在前一个定时器代码执行完之前，不会像队列插入新的定时器代码。确保不会有间隔的损失。而且它可以保证下一次定时器代码执行前，至少要等待指定的间隔，避免连续运行。

### Yielding Processes
```
for(var i=0, len = data.length; i < len; i++) {
	process(data[i]);
}
```
数组中的项目数量直接关系到执行完该循环的时间长度。由于JS的执行时阻塞操作，脚本运行时间越久，用户无法与界面交互事件越长。

我们可以采用`数组分块(array chunking)`的方式：
小块小块处理数组。为要处理的项目创建一个队列，通过定时器取出下一个要处理的项目进行处理，再设置另一个定时器。
基本模式如下。
```
setTimeout(function(){
	//取出下一个条目并处理
	var item = array.shift();
	process(item);

	//如果还有条目，再设置另一个定时器
	if(array.length > 0) {
		setTimeout(arguments.callee, 100);
	}
}, 100);
```
chunk()接受三个参数：要处理的项目的数组，用于处理项目的函数，可选的运行该函数的环境。
```
function chunk(array, process, context) {
	setTimeout(function(){
		var item = array.shift();
		process.call(context, item);

		if(array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100)
};
var data = [12,12321,232132,343546,67676,788,45,32,432,432,43,2];
function printValue(item) {
	var div = document.getElementById("myDiv");
	div.innerHTML += item + "<br>";
}
//data.concat()返回和原来数组中项目一样的数组
chunk(data.concat(), printValue);
console.log(data);
```
因为传递给chunk()的数组是用作一个队列的，因此当处理数据的同时，数组中的条目也在变，如果想保持原数组不变，那么将该数组的克隆传递chunk()。

**一旦某个函数要花50ms以上的时间完成，那么最好看看能否将任务分割成一系列可以使用定时器的小任务。**

### 函数节流

```
window.onresize = function(){
	var div = document.getElementById('myDiv');
	div.style.height = div.offsetWidth + "px";
}
```
onresize 事件会在窗口或框架被调整大小时发生。如果我们想在onresize事件处理程序内部进行DOM操作，其高频率的更改很容易导致浏览器崩溃。

```
function throttle(method, context){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);
	}, 100);//根据需求修改时间间隔
}

function resizeDiv(){
	var div = document.getElementById('myDiv');
	div.style.height = div.offsetWidth + "px";
};
window.onresize = function(){
	throttle(resizeDiv());
}
```
这种方式在DOM操作上节省了非常多的计算。

只要代码是周期执行的，都应该使用节流。