
### Object.defineProperty()
当需要对属性描述符进行操作时，可以使用`Object.defineProperty()`。可以定义一个新属性或者修改原有属性。

```
var a = {name: 'zaynex'}
Object.defineProperty(a, 'count', {})
Object.getOwnPropertyDescriptor(a, 'count')
// Object {value: undefined, writable: false, enumerable: false, configurable: false}
```

如果传入一个空的属性描述对象，那么
- value: undefined
- set: undefined
- get: undefined
- writable: false
- enumerable: false,
- configurable: false

```
Object.getOwnPropertyDescriptor(a, 'name')
// Object {value: "zaynex", writable: true, enumerable: true, configurable: true}
```
不使用该方法定义属性或者不定义将会得到默认的
- writable: true
- enumerable: true
- configurable: true

### get() 和 set()
设置属性的时候会执行 set 方法。
```
var x = {}
Object.defineProperty(x, 'count', {
    set: function(value) {
        this.count = value;
    }
})
console.log(x);
x.count = 1;
```
但是这段代码会报错，问题就是每次设置 count 属性的时候都会调用 set 方法，而在该方法内又为 count 属性赋值，会再次触发 set 方法。

所以一般会配合 set 和 get。设置属性的同时声明。
```
var x = {}
Object.defineProperty(x, 'count', {
    get: function(){
        return this._count;
    },
    set: function(value) {
        this._count = value;
    }
})
console.log(x);
x.count = 1;
```
事实上，在使用`defineProperty()`方法设置属性时，通常需要在对象内部维护一个新内部变量（以下划线_开头，表示不希望被外部访问），作为存取器函数的中介。


## reference
1. https://my.oschina.net/u/3451529/blog/918996?from=20170618