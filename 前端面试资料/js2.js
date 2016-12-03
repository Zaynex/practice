// var a = 2;
// (function IIFE(global, undefined){
// 	var a = 3;
// 	console.log(a);
// 	console.log(global.a);//将window全局对象通过参数传递，分清楚全局和局部变量
// })(window);
// console.log(a);

// // 如果undefined作为参数可以确保里面的 undefined 就是 undefined 

// var foo = true;
// if(foo){
// 	{
// 		let bar = foo * 2;
// 		bar = bar+2;
// 		console.log(bar);
// 	}
// 	console.log(bar);
// }
// console.log(bar);


// a = 2;
// var a;
// console.log(a);

// var a;
// console.log(a);
// a = 2;


// foo();
// var foo;
// function foo(){
// 	console.log(1);
// };
// foo = function(){
// 	console.log(2);
// };
// foo();

// function foo(){
// 	console.log(1);
// }

// foo();
// foo = function(){
// 	console.log(2);
// }
// foo();


// foo();
// function foo(){
// 	console.log(1);
// }

// var foo = function(){
// 	console.log(2);
// }

// function foo(){
// 	console.log(3);
// }
// foo();

// function foo(){
// 	var a =2;
// 	function bar(){
// 		console.log(a);
// 	}
// 	bar();
// }
// foo();


// function foo(){
// 	var a = 2;
// 	function bar(){
// 		console.log(a);
// 	}
// 	return bar;
// }
// var baz = foo();

// baz();//2

// function foo(){
// 	var a = 2;
// 	function baz(){
// 		console.log(a);
// 	}
// 	bar(baz);
// }

// function bar(fn){
// 	fn();
// }
// foo();

// var fn;
// function foo(){
// 	var a = 2;
// 	function baz(){
// 		console.log(a);
// 	}
// 	fn = baz;//baz分配到全局变量
// }

// function bar(){
// 	fn();
// };

// foo();
// bar();


// for(var i = 1; i <=5; i++){
// 	setTimeout(function(){
// 		console.log(i);
// 	}, i *1000);
// }


// for(var i = 1; i <=5; i++){
// 	(function(j){
// 		setTimeout(function(){
// 			console.log(j);
// 		}, j * 1000);
// 	})(i);
// }

// for(let i = 1; i <=5; i++){
//     let j = i;
//     setTimeout(function timer(){
//         console.log(j);
//     }, j* 1000);
// }

function CoolModule(){
	var something = "cool";
	var anther = [1,2,3];
	function doSomething(){
		console.log(something + "! Module");
	}
	function doAnther(){
		console.log(anther.join("!"));
	}
	return {
		doSomething: doSomething,
		doAnther: doAnther
	};
}

var foo = CoolModule();
foo.doSomething();
foo.doAnther();


// var foo = (function CoolModule(){
// 		var something = "cool";
// 		var anther = [1,2,3];
// 		function doSomething(){
// 			console.log(something + "! Module");
// 		}
// 		function doAnther(){
// 			console.log(anther.join("!"));
// 		}
// 		return {
// 			doSomething: doSomething,
// 			doAnther: doAnther
// 		};
// 	}
// )();

// foo.doSomething();
// foo.doAnther();


// var foo = (function CoolModule(id){
// 	function change(){
// 		publicAPI.identify = identify2;
// 	}
// 	function identify1(){
// 		console.log(id);
// 	}
// 	function identify2(){
// 		console.log(id.toUpperCase());
// 	}

// 	var publicAPI = {
// 		change: change,
// 		identify: identify1
// 	};
// 	return publicAPI;
// })('foo module');

// foo.identify();
// foo.change();
// foo.identify();

// var MyModules = (function Manager(){
// 	var modules = {};
// 	function define(name, deps, impl){
// 		for(var i = 0; i < deps.length; i++){
// 			deps[i] = modules[deps[i]];
// 		};
// 		//为模块的定义引入了包装函数（可以传入任意依赖）
// 		modules[name] = impl.apply(impl, deps);
// 		console.log(modules);
// 	}

// 	function get(name){
// 		return modules[name];
// 	}
// 	return {
// 		define: define,
// 		get: get
// 	}
// })();


// MyModules.define('bar', [], function(){
// 	function hello(who){
// 		return 'Let me introduce:' + who;
// 	}
// 	return {
// 		hello: hello
// 	};
// });

// MyModules.define('foo', ['bar'], function(bar){
// 	var hurry = 'hippo';

// 	function awesome(){
// 		console.log(bar.hello(hurry).toUpperCase());
// 	}

// 	return {
// 		awesome: awesome
// 	};
// });

// var bar = MyModules.get('bar');
// var foo = MyModules.get('foo');

// console.log(bar.hello('htiip'));

// foo.awesome();


// var foo = a => {
// 	console.log(a);
// }

// foo(2);

// function foo(a){
// 	console.log(a);
// }
// foo(2);


// var obj = {
// 	id: 'awesome',
// 	cool: function coolFoo(){
// 		console.log(this.id);
// 	}
// };

// var obj = {
// 	id: 'awesome',
// 	cool: ()=>{
// 		console.log(this.id);
// 	}
// };


// var id = 'not awesome';

// obj.cool();
// setTimeout(obj.cool, 1000);


// var obj = {
// 	count: 0,
// 	cool: function coolFoo(){
// 		var self = this;
// 		if(self.count < 1){
// 			setTimeout(function timer(){
// 				self.count++;
// 				console.log('awesome?');
// 			}, 1000);
// 		}
// 	}
// }

// var obj = {
// 	count: 0,
// 	cool: function coolFoo(){
// 		if(this.count < 1){
// 			setTimeout(()=> {
// 				this.count++;
// 				console.log('awesome？');
// 			}, 1000)
// 		}
// 	}
// };

// obj.cool();

// var obj = {
// 	count: 0,
// 	cool: function coolFoo(){
// 		if(this.count < 1){
// 			setTimeout(function timer(){
// 				this.count++;
// 				console.log('more awesome');
// 			}.bind(this), 1000);
// 		}
// 	}
// }

// obj.cool();


// function baz(){
// 	console.log('baz');
// 	bar();
// }

// function bar(){
// 	console.log("bar");
// 	foo();
// }

// function foo(){
// 	debugger;
// 	console.log('foo');
// }

// baz();
// 

// function foo(){
// 	console.log(this.a);
// }
// var a= 2;
// (function(){
// 	'use strict';
// 	foo();
// })();

// function foo(){
// 	'use strict';
// 	console.log(this.a);
// }

// function foo(){
// 	console.log(this.a);
// }

// var obj1 = {
// 	a: 42,
// 	foo: foo
// }

// obj1.foo();//42

// var obj2 = {
// 	a: 44,
// 	obj1: obj1
// }
// obj2.obj1.foo();

function foo(){
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo;
var a = 'global';
bar();//global


function foo(){
	console.log(this.a);
}

function doFoo(fn){
	fn();
}

var obj = {
	a: 2,
	foo: foo
};

var a= 'global';
doFoo(obj.foo);