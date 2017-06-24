## 类继承
Object.create()
```
function Parent(name) {
    this.name = name;
}

Parent.prototype.myName = function() {
    console.log( this.name )
}

function Child(name, label) {
    Parent.call(this, name)
    this.label = label
}

Child.prototype = Object.create(Parent.prototype)

Child.prototype.myLabel = function(){
    console.log( this.label )
}

var a = new Child('ab', 'obj ab')
a.myName()
a.myLabel()
var b = new Parent('ab', 'obj ab')
b.myName()
```
Object.create能够创建一个空对象，并且把新对象内部的 __proto__ 指针关联到指定的对象
```
if(!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
}
```

但是通常我们还有另外一种做法就是：
```
Child.prototype = new Parent();
```
但是这种方式并不推荐，因为它使用的了 Foo() 的构造函数调用，如果这个函数有一定的副作用的话，可能会影响到 子函数的后代。
所以要创建一个合适的关联对象，必须使用 Object.create(),不过它的缺点就是需要创建一个新的空对象然后把旧对象抛弃，不能直接修改已经的默认对象。

ES5中可以操作 __proto__ 来修改对象的原型链关联关系，但兼容性较差，ES6中有推荐的做法：
```
Object.setPrototypeOf(Child.prototype, Parent.prototype)
```
直接修改 Child.prototype 的关联为 Parent.prototype。


## 判断类的关系
```
a instanceof Foo
```
instanceof 只是用来判断 a 的整条[[prototype]] 链中是否有指向 Foo.prototype 的对象。
无法判断两个对象之间是否通过[[prototype]]链关联

在a的整条 [[prototype]] 链中是否出现过 Foo.prototype
```
Foo.prototype.isPrototypeOf(a)
```

判断原型链是否全等
```
a.__proto__ === Foo.prototype

// 更好的做法
Object.getPrototypeOf(a) === Foo.prototype
```

其实 __proto__ 的实现大致是这样的：
```
Object.defineProperty(Object.prototype, "__proto__", {
    get: function(){
        return Object.getPrototypeOf(this)
    },
    set: function(){
        Object.setPrototypeOf(this, o)
        return o
    }
})
```


