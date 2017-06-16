类型断言：
<type>something
```
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```


枚举
一种包含一组被称为枚举数列表的已命名常数的不同类型。
注意点就是已命名，然后是常数。默认情况下，第一个枚举数具有值 0，并且每个连续枚举数的值将增加 1。


类
class 定义类，
constructor 用来定义构造函数，
每次通过 new生成实例时，都会自动调用构造函数。
```
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

类继承
使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。

```
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

```
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
```

存取器
```
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

静态方法
使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：
```
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```


private 
修饰私有属性方法，无法在声明它的类的外部访问。

public
默认为该修饰属性，表示属性和方法都是公有的，可以在任何地方被访问到。

protected
和private类似，区别是它在子类中也是允许被访问的。
如果基类(Animal)中有 protected 修饰的属性或方法，则继承它的类(Cat)也能使用该方法，但是 private 不行。


抽象类
abstract 用于定义抽象类和其中的抽象方法。
抽象类是不允许被实例化。
抽象类中定义的方法必须在子类中实现。
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```

实现（implements）是面向对象中的一个重要概念。
一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。

```
interface Alarm {
  alert();
}

interface Light {
  lightOn();
  lightOff();
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
```