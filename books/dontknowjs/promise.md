### promise决议
promise决议后就是外部不可变的值，可以确保它不会被修改。

### promise出错
~~由于决议后的回调函数(.then(resolve(), reject()))之后也是返回了一个新的promise。但是如果resolve或者reject里面的函数出错了，Promise将无法检查到错误。~~
如果当前的then()的完成函数或拒绝处理函数抛出异常，会导致下一个链中的promise因这个异常而立刻拒绝。

这使得错误可以沿着Promise链传递开区，直到遇到显示定义错误的拒绝处理函数
```js
var p = new Promise(function(resolve, reject){
    reject('oops');
});
var p2 = p.then(
    function fulfilled(){
        console.log('111');
    },
    function reject(){
        console.log('error');
    })
```

错误往下传递

```js
var p = new Promise(function(resolve, reject){
    reject('oops');
});
var p2 = p.then(
    function fulfilled(){
        console.log('111');
    })
    .then(function foo(){}, function reject(){console.log('error')})
```

### 建立可信任的Promise
```js
Promise.resolve(foo(32))
    .then(function(v){
    console.log(v)
    })
```