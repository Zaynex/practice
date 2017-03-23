对象：
无序属性的集合，其属性可以包含基本值、对象或函数。

属性类型

	数据属性
	Configurable	能否通过delete删除属性从而重新定义属性  默认为true

	Enumberable		表示能否通过for-in 循环返回属性，默认为true

	Writable		表示能否修改属性的值

	Value			包含这个属性的数据值 undefined;



	访问器属性
	Configurable	能否通过delete删除属性从而重新定义属性

	Enumberable		表示能否通过for-in 循环返回属性，默认为true

	Get				在读取属性时调用的函数，默认 undefined

	Set 			在写入属性时调用而函数，默认 undefined


	Object.defineProperty()  ：属性所在对象、属性名字、一个描述符对象

	访问器属性不能直接定义，必须用 Object.defineProperty() 来定义

	var  book = {
		_year = 2004;
		edition = 1
	};

	Object.defineProperty(book, "year", {
		get: function(){
			return this._year;
		},

		set: function(newValue){

			if(newValue > 2004) {
				this._year = newValue;
				this.edition +=newValue -2004;
			}
		};
	})

	book.year =2005;
	alert(book.edition)  //2


	老版本方法

	book._defineGetter_("year",function(){
		return this._year;
	});

	book._defineSetter_("year", function(newValue){
		if(newValue>2004){
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	});






## 创建对象
使用对象字面量的形式一个接口会创建很多对象， 会产生大量的重复代码。
peroson1 = {
	name: "Nicholas",
	age: 29,
	job: "software Engineer",

	sayName: function(){
		alert(this.name);
	}
};

peroson2 = {
	name: "Zaynex",
	age: 22,
	job: "Doctor",

	sayName: function(){
		alert(this.name);
	}
};

如果要创建一个name叫"Zaynex"的person，又要重新定义一段大量重复的代码，于是有了工厂模式。

###	工厂模式
- 用函数来封装以特定接口创建对象的细节，依靠返回内部的构造函数来保存对象。
'''
	function createPerson (name,age,job)
	{
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName =function()
		{
			alert(this.name);
		}
		return o;
	}

	var person1 = createPerson("Simon", 29, "software Engineer");
	var person2 = createPerson("Zaynex",22, "Doctor");
'''
- 这种模式解决了创建多个相似对象的问题，但却没办法知道这个对象是什么类型的。（啥意思？）


###	构造函数模式：
- 可用于创建特定模式的对象，像Object、Array等原生构造函数，在运行时会自动出现在执行环境中。
我们利用构造函数重写下刚才的函数
'''	
function createPerson(name, age, job)
	{
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function()
		{
			alert(this.name);
		};
	}

	var person1 = new Person("Simon",29, "software Engineer");
	var person2 = new Person("Simon",29, "software Engineer");
'''

###	构造函数与工厂模式的差异：
	1.没有显示地创建对象；
	2.直接将属性和方法赋给this对象；
	3.没有 return 语句；

	我们注意到Person开头是大写，按照惯例来讲，构造函数开头字母是大写，非构造函数以小写字母开头。

###	要创建Person的实例，必须使用new 操作符。所以调用构造函数会经历以下4个步骤
	1.创建一个新对象
	2.将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
	3.执行构造函数中的代码（为构造函数新对象添加属性）
	4.返回新对象

	person1和person2都保存着Person的一个不同的实例。这两个对象都有一个constructor(构造函数)属性，该属性指向Person。
	alert(person1.constructor == Person) //true;
	alert(person2.constructor == Person) //true;

	对象的constructor属性最初是用来标识对象类型的。但是提到检测对象类型，还是instanceof操作符更可靠一些。
	alert(person1 instanceof Object);
	alert(person1 instanceof Person);
	alert(person2 instanceof Object);
	alert(person2 instanceof Person);
	//都为true.
	我们所创建的所有对象都是Object的实例，同时也是Person的实例。
	创建自定义的构造函数意味着将来可以作为实例标识为一种特定的类型：（person1和perosn2都被转化成了特定的对象类型），构造函数模式胜过工厂模式的地方。这就是答案。

### 把构造函数当函数
	任何函数，只要通过  new 操作符来调用，那它就可以作为构造函数；
```
	//当做构造函数使用
	var person = new Person("Simon", 29, "software Engineer");
	person.sayName(); //Simon

	//普通函数调用
	Person("Genf", 23, "DOCTOR");  //添加到window
	window.sayName();  // Genf
```
以刚才的那种方式定义的构造函数定义在Global对象中（在浏览器中是window对象），在全局作用域中调用函数时，this指向的是window对象。
```
	// 在另外一个对象的作用域中调用
	var o = new Object();
	Person.call(o, "Kristen", 25, 'nusd');
	o.sayName(); // Kristen
```
###	构造函数的缺陷：
	每个方法都要在每个实例上重新创建一遍。
	person1 和 person2 都有一个名为 sayName() 的方法；但那两个方法都不是同一个 Function 的实例，因此会有不同的作用域链和标识符解析；
	不同实例上的同名函数是不同的，


	不要忘了，每个函数都是一个对象！所以sayName方法也可以这样写，因此每个Person实例都包含着不同的Function实例。以这种方式创建函数，会导致不同饿作用域和标识符加息。
	this.sayName = new Function("alert(this.name)");  //与声明函数在逻辑上是等价的
	我们可以检验下
'''	
	alert(person1.sayName() == person2.sayName) //false;
'''

创建两个完成相同任务的Function 实例没有必要，况且有this对象在，根本不用在执行代码前就把函数绑定到特定对象上面。
- 我们可以通过函数定义转移构造函数外部来解决这个问题。
```
function Person(name, age ,job)
{
	this.name = name;
	this.age = age;
	this.sayName = sayName;
}

function sayName()
{
	alert(this.name);
}

var person1 = new Person("Simon", 29, "software Engineer");
var person2 = new Person("Zaynex", 29, "DOCTOR");
```
把sayName()函数的定义转移到了构造函数外部。
在构造函数内部，将sayName属性设置成等于全局的 sayName 函数。 
这样sayName 包含的是一个指向函数的指针。 person1和person2共享同一个sayName()函数
但问题是：
**
但在全局作用域中定义的函数实际上只能被某个对象调用，这不就让全局函数显得很鸡肋么！如果对象需要定义很多方法，那么就要定义多个全局函数。
**

因此我们需要用原型模式来解决这个问题。


### 原型模式
我们创建的每个函数都有一个  prototype（原型） 属性，这个属性属于指针，它指向一个对象，而这个对象的用途是包含可以
由特定类型的所有实例的共享的属性和方法。（这样我们就能共享sayName()方法咯）

即通过构造函数而创建的那个对象实例的原型对象。我们不必将构造函数定义对象实例的信息中，而是可以将这些信息直接添加到对象原型中。
```
function Person(){
}

Person.prototype.name ="Simon";
Person.prototype.age = 29;
Person.prototype.job = "software Engineer";
Person.prototype.sayName = function(){
	alert(this.name);
};
var person1 = new Person();
person1.sayName();  // Simon
var person2 = new Person();
person2.sayName(); // Simon
	alert(person1.sayName == person2.sayName); // true
```
实际上，person1和person2都不包含属性和方法，因为Perosn这个构造函数是空函数。但可以调用person1.sayName()。

### 理解原型对象

无论何时，只要创建了新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的原型对象。在默认情况下，所有原型都会自动获得一个constructor（构造函数）属性，
这个属性包含在一个指向 prototype属性所在的函数的指针。
举例说明： Person.prototype.constructor 指向Person.

创建了自定义构造函数之后，其原型对象默认只会取得 constructor 属性。其他方法都是从Object继承来的。

调用构造函数的一个实例后，该实例内部将包含一个指针（ES5中称为[[Prototype]]，指向构造函数的原型对象。在脚本中没有标准形式访问[[Prototype]]，但在FF,SF,Chrome中的每个对象都支持属性_proto_;在其他实现中，该属性对脚本不可见。
要明确的是，** 这个链接存在于实例与构造函数的原型对象之间，而非实例与构造函数之间。 **

虽然在现实中无法访问到[[Prototype]],但可以通过 isPrototypeOf()来确定是否存在这种关系。

在ES5中新增一个方法，使用 Object.getPrototypeOf()可以方便的获取一个对象的原型
```
alert(Object.getPrototypeOf(person1).name); // Simon
```	

每当代码读取某个对象的某个属性时，都会执行一次搜索，
1. 先从实例本身开始搜索属性，存在，搜索结束。若不存在，执行2
2. 从实例的原型开始搜索属性。
继续刚才的代码。如果我们继续给实例添加相同的属性，会怎样？
```
function Person(){
}

Person.prototype.name ="Simon";
Person.prototype.age = 29;
Person.prototype.job = "software Engineer";
Person.prototype.sayName = function(){
	alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "xiwenzheng";

alert(person1.name) //xiwenzheng  ——来自实例
alert(person2.name) // Simon  ——来自原型
```

在person1这个实例中重写属性，那么解释器搜索到了实例本身的属性直接返回，
对于person2而言，实例中没有属性，那么再往实例的原型开始搜素属性；
给对象添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性，就是阻止我们访问原型对象，但并不会修改原型对象中的同名属性。即使将person1.name 设置为 null  也不会影响原型对象中的同步属性。		

- 不过delete 实例属性，就可以访问原型对象中的属性了。

```
function Person(){
}

Person.prototype.name ="Simon";
Person.prototype.age = 29;
Person.prototype.job = "software Engineer";
Person.prototype.sayName = function(){
	alert(this.name);
};

var person1 = new Person();
var person2 = new Person();
person1.name = "Zaynex";
alert(person1.name); //Zaynex  ——来自实例
alert(person2.name); // Simon  ——来自原型
delete person1.name;
alert(person1.name); // Simon 来自原型
```
使用hasOwnProperty()可以检测一个属性是否存在实例中还是存在原型中，这个方法只在给定属性存在于对象实例中才会返回 true;
我们继续采用刚才删除部分的整段代码。
alert(person1.hasOwnProperty("name")); // 返回false
原先person1.name是存在对象实例中的（被我们设为了"Zaynex"）,但是被我们delete了。
如果我们不delete的话，那就是true了。

要想获得原型属性的描述符，必须要在原型对象上调用 Object.hasOwnPropertydDsecriptor();


原型与 in 操作符

in 操作符会在通过对象能够访问给定属性时返回 true ，不论该实例存在于实例中还是原型中。

利用in:判断是否有该属性
利用hasOwnProperty()判断是否存在对象实例中;
结合以后就可以判断该属性是在原型中还是在实例中。
```
function hasPrototypeProperty(object, name ){
	return !object.hasOwnProperty(name) && (name in object);
}
person1.name = "Zaynex";
alert(hasPrototypeProperty(person1, "name")); //false；存在实例中
```
for-in 循环时，返回的都是通过对象访问的、可枚举的属性（即将[[Enumberable]]标记为true的属性）,在ES5中constructor 和 prototype属性的 [[Enumberable]]
设为false，但并不是所有浏览器都照此实现。
想取得对象上所有可枚举的实例属性，可以使用Object.Keys()方法。
```
	function Person(){
	}

	Person.prototype.name ="Simon";
	Person.prototype.age = 29;
	Person.prototype.job = "software Engineer";
	Person.prototype.sayName = function(){
		alert(this.name);
	};

	var keys = Object.keys(Person.prototype);
	alert(keys);//  name ,age, job, sayName

	var p1 = new Person();
	p1.name = "Rob";
	p1.age = 29;

	var p1keys = Object.keys(p1);
	alert(p1keys);  // name ,age 
```
Object.getOwnPropertyNames()可以获得所有实例属性
```
	var keys = Object.keys(Person.prototype);
	alert(keys);//  constructor, name ,age, job, sayName	
```


### 更简单的原型语法

	之前的例子中每添加一个属性和方法都要 Person.prototype，我们进行适当的封装。
```
function Person(){
}

Person.prototype = {
	name : "Simon",
	age : 29;
	job : "software Engineer",
	sayName : function  () {
		alert(this.name);
	}
};
```
这种对象字面量形式的写法会创建新的对象，每创建一个函数还会自动创建prototype对象并且会指定获得constructor属性。这里的语法本质上是重写了默认的 prototype 对象。
所以 constructor属性也成了了新对象的属性。（指向Object构造函数），不再指向Person。

instanceof 测试 Object 和 Person 都返回 true，但constructor 属性则等于Object而不等于Person。
如果 constructor 的值很重要，则可以特意设置回适当的值
```
	function Person(){
	}

	Person.prototype = {
		constructor:Person,
		name : "Simon",
		job : "software Engineer",
		sayName : function () {
			alert(this.name);
		}
	}
```
- 注意，以这种方式重设constructor属性会导致 [[Enumberable]]特性设置为true，但默认我们是不可枚举constructor属性的。

为了兼容ES5的JS引擎，可以用 Object.defineProperty()把它改成不可枚举。
```
	function Person(){
		}

		Person.prototype = {
			name : "Simon",
			job : "software Engineer",
			sayName : function () {
				alert(this.name);
			}
		}
	Object.defineProperty(Person.prototype, "constructor", {
		enumerable: false,
		value: Person
	});
```
### 原型的动态性

在原型中找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能立即从实例中反应出来——即使是先创建实例后修改原型。
不信你看：
```
var friend = new Person();
Person.prototype.sayHi = function(){
	alert("hi");
};
friend.sayHi();  // "hi" 
```
这样是没问题的。先在实例中搜索，如果没找到继续搜索原型。


但是如果重写了整个原型对象，情况就会不一样(记得重写原型对象相当于创建了一个新函数)
```
function Person(){

}
var  friend = new Person();
Person.prototype = {
	constructor:Person,
	name : "Simon",
	job : "software Engineer",
	sayName : function () {
		alert(this.name);
	}
};
friend.sayName();  //error
```
在这个例子中，我们先创建了Person的实例，然后又重写了其原型对象，然后在调用sayName()时发生错误，因此friend指向的原型不包含以该名字命名的属性。
friend的[[prototype]]指针指向了最初没有任何方法属性的构造函数（Person）的原型，而该原型的constructor属性指向了该构造函数（Person）,因为我们重写了构造函数的原型，所以原本person的原型指向了新的Person原型。这个新原型的constructor属性指向了原来的构造函数（person）。

** 调用构造函数时会为实例添加一个指向最初原型的 prototype 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初函数之间的联系。
请记住：所有实例中的指针仅指向原型，而不指向构造函数。 **

不推荐在产品化的程序中修改原生对象的原型。



### 原型对象的问题：
1. 省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都取得相同的属性值。
2. 共享导致的问题，对于包含引用类型值的属性来说，这个问题比较突出。
```
function Person(){
}

Person.prototype = {
    constructor:Person,
    name : "Simon",
    job : "software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    }
};

var  person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");
console.log(person1.friends); //["Shelby", "Court", "Van"]
console.log(person2.friends); // ["Shelby", "Court", "Van"]
alert(person1.friends === person2.friends) // true;
```
修改person1.friends 引用的数组，添加字符串，由于 friends数组存在 Person.prototype 而非 person1中，所以修改也会造成person2.friends反应。
 
### 组合使用构造函数模式和原型模式
利用构造函数定义实例属性，用原型模式定义方法和共享的属性。
```
function Person (name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelby", "Court"];
}

Person.prototype = {
	constructor : Person,
	sayName : function (){
		alert(this.name);
	}
}


var person1 = new Person("Nicholas", 29, "software Engineer");
var person2 = new Person("Greg", 27, "DOCTOR");

person1.friends.push("Van");
alert(person1.friends);  // Shelby,Court,Van
alert(person2.friends); // shelby,Court
alert(person1.friends === person2.friends); // false
alert(person1.sayName === person2.sayName); // true
``` 
实例属性都是在构造函数中定义的，所有实例共享的属性是在 constructor 和方法sayName()是在原型中定义的。


### 动态原型模式
   当其他OO语言经验开发人员看到独立的构造函数和原型时，会感到困惑。因此出现了 动态原型模式：
   即把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同事使用构造函数和原型的优点。

   换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。
```
function Person (name, age, job){
    //属性
   this.name = name;
   this.age = age;
   this.job = job;
   this.friends = ["Shelby", "Court"];

   if( typeof this.sayName != "function"){
       Person.prototype.sayName = function() {
           alert(this.name);
       };
   }
 }
// 只有在sayName不存在的情况下， 才将其添加到原型中，这段代码只会在初次调用函数时执行。此后原型已经完成初始化，不需要再做修改。
var  friends1 = new Person("Nicholas", 29, "software Engineer");
var friends2 = new Person("Zaynex",19,"Engineer");
friends1.sayName();
friends2.sayName();
```
由于第一次当friends1初始化之后，friends2就不需要再进行初始化原型。


### 寄生构造函数模式
```
function Person (name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(thi.name);
	};
	return o;
}

var friend = new Person ("Nicholas", 29, "software Engineer");
friends.sayName(); // Nicholas
```
除了使用new 操作符并把使用的包装函数叫做构造函数外，这个模式和工厂模式一样；构造函数在无返回值的情况下，默认返回新对象实例。
而在通过构造函数的末尾添加一个return，可以重写调用构造函数时返回的值。

这个模式可以在特殊情况下用来为对象创建构造函数。

假设我们想创建一个具有额外方法的特殊数组，由于不能直接修改Array构造函数，因此可以使用这个模式
```
function SpecialArray(){
   var values = new Array();

	values.push.apply(values, arguments);

	values.toPipedString = function(){
		return this.join("|");
	}

	return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString());  // red|blue|green
```
函数内部创建了一个数组，通过push()方法初始化了数组的值。
寄生构造函数模式：返回的对象与构造函数或者与构造函数的原型属性没有关系；不能依赖于 instanceof操作符确定对象类型。因此不建议在已使用其他模式的情况下使用该种模式。


### 稳妥构造函数模式
- 稳妥对象，是指没有公共属性，其方法也不引用this的对象。适合在安全环境下（这些环境会禁止使用this 和 new），或者放置数据被其他应用程序改动时使用。
#### 稳妥构造函数模式和寄生构造函数差异
1. 新创建的对象的实例方法不引用this。
2. 不使用new 操作符调用构造函数。
```
function Person(name, age, job) {
   var o = new Object();
   //可以在这里定义私有变量和函数。
   //
   //添加方法
   o.sayName = function(){
       alert(name);
   };
   //返回对象
   return o;
}
var friend = Person("Nicholas", 29, "software Engineer");
friend.sayName();
```
以这种模式创建的对象，除了使用sayName()方法以外，没有其他办法访问name的值。
与计生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间没有什么关系，因此instanceof操作符对这种对象没有意义。

