module.exports只能对外提供单个变量，函数或对象。如果创建了的一个既有module.exports和 exports 的模块，那它会返回 module.exports，忽略 exports。

其实 exports只是对module.exports的全局引用，最初被定义为一个可添加属性的空对象。
所以使用exports 只能像下面这样
```
exports.hello = function(){console.log('hello')}
```

而不能
```
var hello = function(){console.log("hello")};
exports = hello;          // bad
//但是module.exports是可以的
//module.exports = hello  // ok
```
错误的方式相当于是将exports重新赋值，切断了 module.exports 和 exports之间的关系。
