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





/*

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

var singleton = {
	name : value,
	method: function(){
		//code...
	}
};


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
//Michael Michael
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

function Person(name) {
	this.getName = function() {
		return name;
	};
	this.setName = function(value){
		name = value;
	};
}

var person1 = new Person("Zaynex");
alert(person1.getName());
person1.setName("Greg");
alert(person1.getName());

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
*/