
function throttle(method, context){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);
	})
}

function resizeDiv(){
	var div = document.getElementById('myDiv');
	div.style.height = div.offsetWidth + "px";
};
window.onresize = function(){
	throttle(resizeDiv());
}

/*
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

chunk(data.concat(), printValue);
console.log(data);
setTimeout(function(){
	var div = document.getElementById("myDiv");
	left = parseInt(div.style.left) + 5;
	div.style.left = left + "px";

	if(left < 200) {
		setTimeout(arguments.callee, 50);
	}
}, 50);

for(var i=0, len = data.length; i < len; i++) {
	process(data[i]);
}

setTimeout(function(){
	//取出下一个条目并处理
	var item = array.shift();
	process(item);

	//如果还有条目，再设置另一个定时器
	if(array.length > 0) {
		setTimeout(arguments.callee, 100);
	}
}, 100);

document.getElementById('btn').onclick =function(){
	setTimeout(function(){
		document.getElementById('message').style.visibility = "visible";
	},250)
};

setTimeout(function(){
	setTimeout(arguments.callee, interval);
},interval)

setTimeout(function(){
	var div = document.getElementById("myDiv");
	left = parseInt(div.style.left) + 5;
	div.style.left = left + "px";
},50)

function bind(fn, context) {
	var args = Array.prototype.slice.call(arguments,2);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	}
}

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
function add(num1, num2){
	return num1 + num2;
}

function curriedAdd(num2){
	return add(5, num2);
}
alert(add(2, 3)); //5
alert(curriedAdd(3));//8

function bind(fn, context){
	return function(){
		return fn.apply(context, arguments);
	}
};

var handler = {
	message: "Event handled",

	handleClick: function(event) {
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
btn.addEventListener("click", bind(handler.handleClick, handler));


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
	return createXHR()
}

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
 */
/*
function type(str) {
	alert(Object.prototype.toString.call(str).slice(8,-1));
}

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


*/