函数声明提升
在执行代码之前会读取函数声明。

// 函数声明
function foo() {}

// 函数表达式
(function bar() {})

// 函数表达式
x = function hello() {}

if (x) {
   // 函数表达式
   function world() {}
}

// 函数声明
function a() {
   // 函数声明
   function b() {}
   if (0) {
      //函数表达式
      function c() {}
   }
}


sayHi();
function sayHi () {
	alert("hi");
}


var functionName = function  (arg0, arg1, arg2) {
	//函数体
}

匿名函数

sayHi();

var sayHi = function  () {
	alert("hi");
};
错误

函数表达式和其他表达式一样，使用前必须先赋值。



递归函数
函数通过名字的调用自身

function factorial (num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num-1);
	}
}


var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4));  // Error


function factorial (num) {
	if(num <= 1){
		return 1;
	} else{
		return num * arguments.callee(num-1);  //代替函数名
	}
}

如果你想在函数体内部引用当前函数，则需要创建一个命名函数表达式。然后函数名称将会（且只会）作为函数体（作用域内）的本地变量。这样也可以避免使用非标准的 arguments.callee 属性。
在严格模式下，不能访问 arguments.callee()，不过可以用函数命名表达式达到相同的效果。

var factorial = (function f(num) {
	if(num <= 1){
		return 1;
	} else{
		return num * f(num-1);  //代替函数名
	}
});

上述代码中f()就是命名函数表达式。
要记住：这个名字只在新定义的函数作用域内有效，因为规范规定了标示符不能在外围的作用域内有效。
```
var f = function foo(){
    return typeof foo; // foo是在内部作用域内有效
  };
  // foo在外部用于是不可见的
  typeof foo; // "undefined"
  f(); // "function"
```  

命名函数表达式对调试来说非常方便。
```
	function foo(){
    return bar();
  }
  function bar(){
    return baz();
  }
  function baz(){
    debugger;
  }
  foo();
```
![image](http://note.youdao.com/yws/res/33607/WEBRESOURCEae9e978c13b3626a211851993df2ad21)

```
 function foo(){
 	return bar();
 }

 var bar = (function(){
 	if(window.addEventListener) {
 		return function(){
 			return baz();
 		};
 	}else if (window.attachEvent) {
 		return function(){
 			return baz();
 		}
 	}
 })();

 function baz(){
 debugger;
 }
 foo();
```
![image](http://note.youdao.com/yws/res/33609/WEBRESOURCEf48f566eb5b88714a9623a646155a857)
在上述调用栈中我们发现bar函数没有显示出来。这是google浏览器下的。
但在Firefox中已经修复这个问题
![image](http://note.youdao.com/yws/res/33611/WEBRESOURCE92309646cad82fba6aa3dac609e4aa3f)
我们可以使用命名函数表达式方便调试。
```
function foo(){
	return bar();
}
var bar = (function(){
	if(window.addEventListener) {
		return function bar(){
			return baz();
		};
	}else if(window.attachEvent) {
		return function bar() {
			return baz();
		}
	}
})();

function baz(){
	debugger;
}
foo();
```
![image](http://note.youdao.com/yws/res/33613/WEBRESOURCE3989a79389e09c940f7b22160b6af1e3)
好吧，命名函数表达式就这点P作用。

JScript中的BUG。
**函数表达式的标示符泄露到外部作用域**
```
var f = function g(){};
		console.log(typeof g);
```
chorme
![image](http://note.youdao.com/yws/res/33615/WEBRESOURCEc958ec6edb823174c2d6aecba5ab7677)

IE
![image](http://note.youdao.com/yws/res/33617/WEBRESOURCEd700aa46874d60756a1f7d75fa0ade55)

上面我们说过，命名函数表达式的标示符在外部作用域是无效的，但JScript明显是违反了这一规范，上面例子中的标示符g被解析成函数对象，这就乱了套了，很多难以发现的bug都是因为这个原因导致的。

注：IE9修复了该问题

命名函数表达式同时当作函数声明和函数表达式
```
console.log(typeof g);
	var f = function g(){};
```	
特性环境下，函数声明会优先于任何表达式被解析，上面的例子展示的是JScript实际上是把命名函数表达式当成函数声明了，因为它在实际声明之前就解析了g。

命名函数表达式会创建两个截然不同的函数对象！
```
var f = function g(){};
    f === g; // false

    f.expando = 'foo';
    g.expando; // undefined
		
		//IE9已经修复了该问题
```
因为修改任何一个对象，另外一个没有什么改变，这太恶了。通过这个例子可以发现，创建2个不同的对象，也就是说如果你想修改f的属性中保存某个信息，然后想当然地通过引用相同对象的g的同名属性来使用，那问题就大了，因为根本就不可能。


```
    var f = function g() {
      return 1;
    };
    if (false) {
      f = function g(){
        return 2;
      };
    }
    g(); // 2
```
这个bug查找就难多了，但导致bug的原因却非常简单。首先，g被当作函数声明解析，由于JScript中的函数声明不受条件代码块约束，所以在这个很恶的if分支中，g被当作另一个函数function g(){ return 2 }，也就是又被声明了一次。然后，所有“常规的”表达式被求值，而此时f被赋予了另一个新创建的对象的引用。由于在对表达式求值的时候，永远不会进入“这个可恶if分支，因此f就会继续引用第一个函数function g(){ return 1 }。分析到这里，问题就很清楚了：假如你不够细心，在f中调用了g，那么将会调用一个毫不相干的g函数对象。		


你可能会问，将不同的对象和arguments.callee相比较时，有什么样的区别呢？我们来看看：
```
var f = function g(){
    return [
      arguments.callee == f,
      arguments.callee == g
    ];
  };
  f(); // [true, false]
  g(); // [false, true]
```
可以看到，arguments.callee的引用一直是被调用的函数，实际上这也是好事，稍后会解释。

还有一个有趣的例子，那就是在不包含声明的赋值语句中使用命名函数表达式：
```
  (function(){
    f = function f(){};
  })();
```
按照代码的分析，我们原本是想创建一个全局属性f（注意不要和一般的匿名函数混淆了，里面用的是带名字的生命），JScript在这里捣乱了一把，首先他把表达式当成函数声明解析了，所以左边的f被声明为局部变量了（和一般的匿名函数里的声明一样），然后在函数执行的时候，f已经是定义过的了，右边的function f(){}则直接就赋值给局部变量f了，所以f根本就不是全局属性。

了解了JScript这么变态以后，我们就要及时预防这些问题了，首先防范标识符泄漏带外部作用域，其次，应该永远不引用被用作函数名称的标识符；还记得前面例子中那个讨人厌的标识符g吗？——如果我们能够当g不存在，可以避免多少不必要的麻烦哪。因此，关键就在于始终要通过f或者arguments.callee来引用函数。如果你使用了命名函数表达式，那么应该只在调试的时候利用那个名字。最后，还要记住一点，一定要把命名函数表达式声明期间错误创建的函数清理干净。


JScript内存管理


知道了这些不符合规范的代码解析bug以后，我们如果用它的话，就会发现内存方面其实是有问题的，来看一个例子：
```
var f = (function(){
    if (true) {
      return function g(){};
    }
    return function g(){};
  })();
```
我们知道，这个匿名函数调用返回的函数（带有标识符g的函数），然后赋值给了外部的f。我们也知道，命名函数表达式会导致产生多余的函数对象，而该对象与返回的函数对象不是一回事。所以这个多余的g函数就死在了返回函数的闭包中了，因此内存问题就出现了。这是因为if语句内部的函数与g是在同一个作用域中被声明的。这种情况下 ，除非我们显式断开对g函数的引用，否则它一直占着内存不放。

```
var f = (function(){
    var f, g;
    if (true) {
      f = function g(){};
    }
    else {
      f = function g(){};
    }
    // 设置g为null以后它就不会再占内存了
    g = null;
    return f;
  })();
```

通过设置g为null，垃圾回收器就把g引用的那个隐式函数给回收掉了，为了验证我们的代码，我们来做一些测试，以确保我们的内存被回收了。



中文出处：http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html
英文地址：https://kangax.github.io/nfe/#function-statements





