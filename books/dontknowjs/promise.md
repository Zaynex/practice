## Promise基础
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

注意， reject是针对Promise决议后出现的错误结果进行处理的，但如果针对决议后的结果进行处理的函数中出现错误，错误不会被检测到。
```js
var p = Promise.resolve(42);

p.then(
    function fulfilled(msg){
        // 这里会抛出错误，但是不会进到reject
        console.log(msg.toLowerCase())
        },
    function reject(err){
        //不会到达这里
        })
```

对于这种情况，一般会在.then之后再加上`catch(handleErrors)`,这里就是针对错误的处理了。
但是如果 handleErrors这个函数内部有错误，该怎么办呢？
终结者：
```js
var p = Promise.resolve(42);
p.then(function fulfilled(msg){
    console.log(msg.toLowerCase())
})
.done(null, handleErrors);
```


### 建立可信任的Promise
```js
Promise.resolve(foo(32))
    .then(function(v){
    console.log(v)
    })
```

##Promise API
### Promise.all([...])
在数组里可以是异步操作，也可以是同步，甚至是一个值，不管他们返回结果的先后顺序，但要等到他们的结果都返回以后才进入Promise流。

如果有一个promise被拒绝的话，主Promise.all就会被立即拒绝，并且丢弃前面其他所有的promise的全部结果。

```js
var p1 = request('http://note.youdao.com?keyfrom=1');
var p2 = request('http://note.youdao.com?keyfrom=2');
Promise.all([p1, p2])
    .then(function(msgs){
        // 这里返回的msgs是由p1和p2返回结果组成的数组
        return request(
            'http://note.youdao.com?keyfrom=' + msgs.join(',')
            )
        })
    .then(function(msg){
        console.log(msg);
        })

var p1 = Promise.resolve('111');
var p2 = Promise.resolve('222');

Promise.all([p1, p2])
    .then(function(msgs){
        console.log(msgs)
    },function reject(err){console.log(err)})

// ['111','222']

var p1 = Promise.resolve('111');
var p2 = Promise.resolve('222');
var p3 = Promise.reject('eroorrrrrr....');
Promise.all([p1, p2, p3])
    .then(function(msgs){
        console.log(msgs)
    },function reject(err){console.log(err)})
// 'eroorrrrr....'
```


