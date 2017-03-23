## 继承

	大部分OO语言都有接口继承和实现继承。 接口继承指继承函数方法签名，实现继承指继承实际的方法，由于JS中函数没有签名，因此ECMAScript中无法实现接口继承。
	ECMAScript只支持实现继承，并且实现继承主要依靠原型链来实现。

    简单回顾下构造函数，原型和实例的关系
    每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例包含指向一个原型对象的内部指针。

    如果让原型对象等于另一个类型的实例，那么此时原型对象将包含一个指向另一个原型的指针，另一个原型对象中也包含一个指向另一个构造函数的指针。
    如果让另一个原型对象又等于另一个类型的实例，那么上述关系依然成立。


    实现原型链基本模式：

    function SuperType(){
    	this.prototype = true;
    }

    SuperType.prototype.getSuperValue = function(){
    	return this.prototype;
    }

    function SubType() {
    	this.subproperty = false;
    }


    SubType.prototype = new SuperType(); //subType 继承了 SuperType

    SubType.prototype.getSuperValue = function() {
    	return this.subproperty;
    };

    var instance = new SubType();
    alert(instance.getSuperValue());


   本质是重写原型对象，代之以一个新类型的实例。
   原来存在于SuperType的实例的所有属性和方法， 现在也存在于 SubType.prototype中；

   注意的是 property 现在位于 SubType.prototype 中了。因为 property 是一个实例属性，而 getSuperValue()则是一个原型方法，
   既然 SubType.prototype 现在是 SuperType.prototype 的实例， 那么property 当然就位于该实例中。
   此外要注意的是 instance.constructor 现在指向的是 SuperType ,这是因为原来 SubType.prototype 中的 constructor 被重写的缘故。（实际上，
   不是被重写，而是 SubType 的原型指向了另一个对象 SuperType 的原型，所以原型对象的 constructor指向了 SuperType）


   在原型链继承的情况下，当读取模式访问一个实例属性时，搜索过程为
   1.搜索实例
   2.搜索SubType.prototype;
   3.搜索 SuperType.prototype



   别忘了默认的原型
   所有函数的默认原型都是Object的实例。

   确实原型和实例的关系

   instance instanceof Object;
   instance instanceof SuperType;
   instance instanceof SubType;   

   都为 true

   因为原型链的关系，instance 可以说是这3个任何一个类型的实例。 
   第二种方法是使用 isPrototypeOf();



    function SuperType(){
      this.prototype = true;
    }

    SuperType.prototype.getSuperValue = function(){
      return this.prototype;
    }

    function SubType() {
      this.subproperty = false;
    }


    SubType.prototype = new SuperType(); //subType 继承了 SuperType

    SubType.prototype.getSuperValue = function() {
      return false;
    };
    SubType.prototype.getSubValue = function() {
      return this.subproperty;
    }; 

     var instance = new SubType();
    var instance2 = new SuperType();
    alert(instance.getSuperValue()); // fasle
    alert(instance2.getSuperValue()); // true
    第二个方法中  getSuperValue() 是原型链已经存在的一个方法，但重写这个方法将会屏蔽原来的那个方法。
    当通过  SubType 的实例调用 getSuperValue()时，调用的是这个重新定义的方法， 但通过 SuperType 的实例调用
    getSuperValue()时，还会继续调用原来的方法。


    在通过原型链实现继承时，不能使用对象字面量创建原型方法。否则会重写原型链。


    function SuperType(){
      this.prototype = true;
    }

    SuperType.prototype.getSuperValue = function(){
      return this.prototype;
    }

    function SubType() {
      this.subproperty = false;
    }


    SubType.prototype = new SuperType(); //subType 继承了 SuperType

    SubType.prototype = {
      getSubValue : function(){
        return this.subproperty;
      },

      someOtherMethod : function(){
        return false;
      }
    };

    var instance = new SubType();
    alert(instance.getSuperValue());  // Error

    现在的原型新创建了一个对象，包含的是Object的原型，而非SuperType 的实例；



    原型链的问题是引用类型值的原型属性会被所有实例所共享，这也是为什么要在构造函数中，而不是在原型对象中定义属性的原因。
    第二个问题，在创建子类型的实例时，不能向超类型的构造函数中传递参数。



    解决原型中包含引用类型值所带来的问题

    1.借用构造函数——经典继承
    在子类型构造函数中内部调用超类型构造函数

    function SuperType(){
      this.colors = ["red", "blue", "green"];
    }

    function SubType () {
      SuperType.call(this);
    }

    var instance1 = new SubType();
    instance1.colors.push("yellow");  // red,blue,green,yellow
    alert(instance1.colors);

    var instance2  = new SuperType();  // red,blue,green
    alert(instance2.colors);

   通过call()方法，实际上是在（未来将要）新创建的SubType实例的环境下调用SuperType构造函数。这样一来，就会在新SubType对象上执行SuperType()函数中定义的所有对象初始化代码。


    1.传递参数

    function SuperType(name) {
      this.name = name;
      this.age = "26";
    }

    function SubType() {
      SuperType.call(this, "Nicholas");
      this.age = 29;
    }


    var instance = new SubType();
    var instance2 = new SuperType();
    alert(instance.name); // Nicholas
    alert(instance.age); // 29
    alert(instance2.age);  // 26

    2.借用构造函数的问题
    如果仅仅是借用构造函数，那么将无法避免构造函数模式的问题——方法都在构造函数中定义，因此函数复用将无从谈起。而且在超类型的原型中定义的方法，对子类型而言依然是不可见的。结果所有类型都只能用构造函数模式。

    2.组合继承
    将原型链和借用构造函数的技术组合到一块。使用原型链实现对原型属性和方法的继承，而通过借用构造函数实现对实例属性的继承
 function SuperType(name) {
      this.name = name;
      this.colors = ["red",'blue', "green"];
    }

    SuperType.prototype.sayName = function(){
      alert(this.name);
    };

    function SubType(name, age)  {
      SuperType.call(this, name);  //第二次调用
      this.age = age;
    }

    SubType.prototype = new SuperType();  //第一次调用
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function  () {
      alert(this.age);
    }

    第一次SuperType()构造函数调用时，SubType.prototype 会得到两个属性：name  和 colors;
    当调用SubType 构造函数时，又一次调用 SuperType构造函数，这一次又在新对象上创建了实例属性：name 和  colors，
    这两个属性屏蔽原型中两个同名属性。


    var instance1 = new SubType("Nicholas", 29);
    instance1.colors.push("black");
    alert(instance1.colors);// red,blue,green,black
    instance1.sayName(); // Nicholas;
    instance1.sayAge(); //29

    var instance2 = new SubType("Greg", 28);
    alert(instance2.colors); // red,blue, green
    instance2.sayName();  // Greg
    instance2.sayAge(); // 28;


    我把 构造函数这一段取消了，为什么效果和原来的一样？








    原型式继承
    function object(o) {
      function F(){}
      F.prototype = o;
      return new F();
    }

    var person = {
      name : "Nicholas",
      friends : ["Shelby", "Court", "Van"]
    };

    var anotherPerson = object(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");

    var yetAnotherPerson = object(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");

    console.log(person.friends); // ["Shelby", "Court", "Van", "Rob", "Barbie"]
    console.log(yetAnotherPerson.friends); //["Shelby", "Court", "Van", "Rob", "Barbie"]

    实际上，这相当于创建了person对象的两个副本。

    ### Object.create()
    ES5中新增 Object.create()方法规范化原型式继承
```
    var person = {
      name : "Nicholas",
      friends : ["Shelby", "Court", "Van"];
    };
    var anotherPerson = Object.create(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");

    var yetAnotherPerson = Object.create(person);
     yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie"); //Shelby,Court, Van, Linda
```
传递两个参数时，为新对象定义额外的属性或者覆盖原有的属性
```
    var person = {
      name : "Nicholas",
      friends : ["Shelby", "Court", "Van"]
    };
    var anotherPerson = Object.create(person, {
      name: {
        value: "Greg"
      }
    });
    console.log(anotherPerson.name); //Greg
```    
    IE9+ ，Firbox4+ ,Safrai5+,Opera12+ chrome;

    在没必要创建构造函数的情况，而只想让一个对象与另一个对象保持类似的情况下， 原型式继承是完全可以胜任的。


    3.寄生式继承
    创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象。

    function createAnother (original) {
      var clone = object(original);  //通过调用函数创建一个对象
      clone.sayHi = function(){ //以某种方式增强这个对象
        alert("Hi");
      };
      return clone;  //返回这个对象
    }

    将作为新对象基础的对象当作参数传入。

    var person = {
      name : "Nicholas";
      friends : ["Shelby", "Greg", "Van"];
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi();

    使用寄生式继承来为对象添加函数，会由于不能做到函数复用而减低效率。

    4.寄生组合式继承
    组合继承最大的问题就是无论在什么情况下，都会调用两次超类型构造函数，一次是在创建子类型原型的时候，一次是在子类型构造函数内部。
    子类型最终都会包含超类型的全部实例属性。


    寄生组合式继承，借用构造函数来继承属性，通过原型链的混成形式来继承方法。
    不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型的一个副本而已。

    function object(o) {
      function F(){}
      F.prototype = o;
      return new F();
    }
    function inheritPrototype (subType, SuperType) {   // (子类型，超类型)
      var prototype = object(SuperType.prototype);
      prototype.constructor = subType;
      subType.prototype = prototype;
    }
    1.创建超类型的一个副本
    2.为创建的副本添加constructor属性，从而弥补因此重写原型而失去的默认的 constructor 属性
    3.为新创建的对象赋予子类型的原型



    function SuperType(name) {
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }

    SuperType.prototype.sayName = function(){
      alert(this.name);
    }
    function SubType (name, age) {
      SuperType.call(this, name);
      this.age = age;
    }

    inheritPrototype(SubType, SuperType);

    SubType.prototype.sayAge = function(){
      alert(this.age);
    }

    只调用一次SuperType函数，避免在SubType.prototype 上创建不必要的多余的属性，保持原型链不变。效率更高。


    