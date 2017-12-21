//var a=["a","b","c","d"] 每过 1 秒 alert 一下数组中的值

var arr = ['a','b','c','d'];
/*
这里显然没有达到每秒出现一个的要求，是一个同步调用函数
for(var i = 0; i < arr.length;i++){
	setTimeout((function(a){
		console.log(arr[a]);
	})(i),1000)
}
 */

for(var j = 0; j <4; j++){
	(function(i){
		setTimeout(function(){
			console.log(arr[i]);
		}, (i+1)*1000);
	})(j);
}
//在我组件webapp开发时有用到闭包


// for(var i = 0; i < arr.length; i++){
// 	setTimeout(function(){
// 		console.log(arr[i]);
// 	},1000)
// }

// var xhr = new XMLHttpRequest();
// xhr.open(Type,URL,boolean);
// xhr.send(null);
// xhr.onreadystatechange = function(){
// 	if(xhr.readyState == 4){
// 		if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
// 			alert(xhr.responseText);
// 		}else {
// 			alert('unsuccessful ' + xhr.status);
// 		}
// 	}
// };


// function Father(name){
// 	this.somke = true;
// 	this.age = 40;
// 	this.shoes = ["拖鞋",'牛皮鞋'];
// 	this.name = name;
// }
// Father.prototype.eat = function(){
// 	console.log("吃饭吃饭！");
// };
// function Child(){	
// 	Father.apply(this,['zaynex']);
// 	this.age = 20;
// }

// Child.prototype = new Father();
// //因为这种方式相当于重写原型对象，所以需要修正下constructor属性
// Child.constructor = Child;
// var boy = new Child();
// boy.shoes.push( "运动鞋");
// console.log(boy.shoes); //[ '拖鞋', '牛皮鞋', '运动鞋' ]
// var girl = new Child();
// console.log(girl.shoes);//[ '拖鞋', '牛皮鞋' ]
// girl.eat();

// var person = {
// 	name: 'zaynex',
// 	friends: ['11','22','33']
// };

// var anotherPerson = Object.create(person);
// anotherPerson.name = 'Ger';
// anotherPerson.friends.push("44");

// var yetanotherPerson = Object.create(Person);
// yetanotherPerson.name = "HH";
// yetanotherPerson.friends;

// function Person(){};

var Person = {};
var Person = new Object();
function Person(){}//只有函数才有原型链，其他创建对象的方式都是没有原型链的
Person.shower = function(){
	console.log("后洗澡");
};
//对象字面量是没有原型的，只有实例方法
//内部有一个 __proto__指针指向Object
Person.prototype.shower = function(){
	console.log("后洗澡");
	return this;
}

Person.prototype.tuotuotuo = function(){
	console.log('先脱脱脱');
	return this;
}
var child = new Person();
child.tuotuotuo().shower();