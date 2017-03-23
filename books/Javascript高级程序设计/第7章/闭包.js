## 闭包

有权访问另一个函数作用域中的变量的函数。

function createComparisonFunction (propertyName) {
	// body...
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if(value1 < value2) {
			return -1;
		}  else if (value2 < value1){
			return 1;
		} else {
			return 0;
		}
	};
}

当函数被调用的时候，会创建一个执行环境及相应的作用域链。然后使用arguments和其他命名参数来初始化活动对象。但在作用域链中，
外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位......直至作为作用域链重点的全局执行环境

有了匿名函数调用后，活动对象不会被销毁。作用域链仍然引用这个活动对象。因此当函数执行完后，其执行环境的作用域链会被销毁，
但它的活动对象仍留在内存中。

闭包会占用较多的内存，所以要慎重使用


### 闭包与变量

作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。


function createFunctions() {
	var result = new Array();

	for(var i=0; i < 0;i++) {
		result[i] = function(){
			return i;
		}
	}

	return result;
}

变量i的值为10.返回的都是10.

通过匿名函数强制让闭包行为符合预期

function createFunctions(){
	var result = new Array();

	for(var i=0;i < 10; i++) {
		result[i] = function(num) {
			return  function(){
				return num;
			};
		}(i);
	}

	return result;
}

将匿名函数的结果返回给数组。在调用匿名函数时，我们传入变量i.由于函数时按值传递，所以就会将变量i的当前值复制给参数num,
在这个匿名函数内部，又创建并返回了一个访问 num 的闭包。

function assignHandle()	{
	var element = document.getElementById("someElement");
	element.onclick = function(){
		alert(element.id);
	}
}
创建了一个作为element 元素事件处理邓旭的闭包。闭包又创建另一个循环引用。
由于匿名函数保存了一个队 assignHandle() 的活动对象的引用。因此就会导致无法减少element的引用数
element 的引用数至少为1，因此它占用的内存就不会被回收。


function assignHandle(){
	var element = document.getElementById("someElement");
	var id = element.id;

	element.onlick = function(){
		alert(id);
	}

	element = null;
}


把 element.id 的一个副本保存在一个变量中。并且在闭包中引用该变量消除循环引用。仅仅做到这一步还无法解决内存泄漏问题

闭包会引用包含函数的整个活动对象，而其中包含着element。
因此有必要将 element  设置为 null;




## 模仿块级作用域

function  outPutNumbers(court) {
	for (var i=0; i<court; i++){
		alert(i);
	}

	var i;
	alert(i);
}
在其他语言中，由于块级作用域的存在，i变量出了for循环之后就被销毁了。但JS不会，以为他没有块级作用域。

JS不会告诉你是否多次声明了同一变量，它只会对后续的声明视而不见，但会执行声明中的变量初始化。 匿名函数可以模仿块级作用域解决这个问题

(function(){
	//块级作用域
})();

**函数声明后面不能跟原括号，但是函数表达式可以**，所以将函数声明转化为函数表达式，只要加() 即可。


function outPutNumbers(court) {
		(function(){
			for (var i=0; i < court; i++) {
				alert(i);
			}
		})();

		alert(i); //错误
}

在for循环外部插入一二私有作用域，在匿名函数中定义的任何变量，都会在执行结束后被销毁。 i只能在循环中使用。


## 私有变量
在函数中定义的变量都可以认为是私有变量。（包括函数参数、局部变量、以及在函数内部定义的其他函数。

### 创建访问私有变量的公共方法
有权访问私有变量和私有函数的公共方法称为特权函数，因为外部函数无法访问内部函数，我们就借助闭包返回函数得以访问。
```
function MyObject() {
	var privateVariable = 10;

	function privateFunction(){
		return false;
	}

	this.publicMethod = function() {
		privateVariable++;
		return privateFunction();
	};
}
var new1 = new MyObject();
document.writeln(new1.publicMethod());
```
在创建MyObject的实例new1后，除了使用publicMethod方法外，没有任何办法可以直接访问 privateVariable和privateFunction()。
```
function Person(name) {
	this.getName = function() {
		return name;
	};
	this.setName = function(value){
		name = value;
	};
}

var person1 = new Person("Zaynex"); 
alert(person1.getName()); //Zaynex
person1.setName("Greg");
alert(person1.getName());//Greg

```
两个方法都在构造函数内部定义，它们作为闭包能够通过作用域链访问name。私有变量name在Person的不同实例中都不相同，因为每次调用构造和桉树都会重新创建这两个方法。
构造函数模式也有缺点：针对每个实例都会创建同一组新方法，而使用静态私有变量可以避免这个问题。

### 静态私有变量
```
(function(){
	var privateVariable = 10;
	function privateFunction() {
		return false;
	}

	//构造函数
	MyObject = function(){
	};
	//公有/特权方法
	MyObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	}

})();
```
这个模式创建了私有作用域。定义了私有变量和私有函数，以及构造函数。公有方法是定义在原型上的（原型模式）。
需要注意的是，这个模式在定义构造函数时并没有使用函数声明，如果使用函数声明那么 MyObject构造函数就成了局部变量。所以没有使用var关键字去声明。

**初始化未经声明的变量，总是会创建一个全局变量**。
但在严格模式下，给未经声明的变量赋值会导致错误。
```
"use strict";
//...这里放原先的代码
//Uncaught ReferenceError: MyObject is not defined
```
这个模式与构造函数定义特权方法最主要的区别就是私有变量和函数都是由实例共享的。
```
(function(){
	var name = "";
	Person = function(value) {
		name = value;
	};

	Person.prototype.getName = function(){
		return name;
	}
	Person.prototype.setName = function(value) {
		name = value;
	}

})();

var person1 = new Person("Zaynex");
document.writeln(person1.getName());
//Zaynex
person1.setName("Simon");
document.writeln(person1.getName());
//Simon

var person2 = new Person("Michael");
document.writeln(person1.getName());
document.writeln(person2.getName());
//Michael 
//Michael
```
这种方式创建私有变量会因为使用原型而增进代码的复用，但每个实例都没有自己的私有变量。

### 模块模式
模块模式是为单例模式创建私有变量和特权方法。**所谓单例，指的就是只有一个实例的对象。**
通过JS是以对象字面量的方式创建单例的。
```
var singleton = {
	name : value,
	method: function(){
		//code...
	}
};

```

模块模式为单例添加自由变量和特权方法使其得到增强。
```
var singleton = function(){
	//私有方法
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}

	//特权、公有方法
	return {
		publicProperty: true,
		publicMethod: function(){
			privateVariable++;
			return privateFunction();
		}
	};
}();
```
在模块模式章使用了一个返回对象的匿名函数。首先定义了私有变量和函数，然后将一个对象字面量作为函数的值返回，返回的对象字面量只包含可以公开的属性和方法。
由于这个对象是在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。

从本质上讲，这个对象字面量定义的是单例的公共接口。

```
var application = function(){
	//私有变量和函数
	var components = new Array();

	//初始化
	components.push(new BaseComponent());

	//公共
	return {
		getComponentCount: function(){
			return components.length;
		}

		registerComponent: function(component) {
			if (typeof component === 'object') {
				components.push(component);
			}
		}
	};
}();
```
**如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有变量数据的方法，那么就可以使用模块模式**
以这种模式创建的每个单例都是Object的实例。所以使用instanceof检测对象类型就没必要了。
### 增强的模块模式

在返回对象之前加入对其增强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性或方法对其加以增强的情况。
```
var singleton = function(){
	//私有方法、变量
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//创建对象
	var object = new CustomType();
	//特权、公有方法
	object.publicProperty = true;
	object.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	}
	return object;
}();

```
如果前面的模块模式的例子中的application对象必须是BaseComponent的实例，那么就可以使用以下代码
```
var application = function(){
	//私有变量和函数
	var components = new Array();

	//初始化
	components.push(new BaseComponent());

	//创建application的一个副本
	var app = new BaseComponent();
	

	//公共方法
	app.getComponentCount = function(){
		return components.length;
	};

	app.registerComponent = function(component) {
		if (typeof component === 'object') {
			components.push(component);
		}
	};
	return app;
}();
```