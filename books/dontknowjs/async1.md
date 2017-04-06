
### setTimeout()
设定了一个定时器，当定时器到时后，再把回调函数添加到事件循环队列中。所以设定setTimeout()之后的那个回调函数只可能在那个时候运行，或者在那之后运行。

### 协作
如果需要遍历很长的结果列表进行值转换的Ajax相应处理函数，单纯的使用Arry.map可以让代码更简洁，但也会带来的问题是阻塞了其他代码的运行。所以要创建一个协作性更强且不会霸占事件队列的并发系统，可以异步的处理这些结果，每次处理一部分之后退出循环，让其他等待事件有机会运行。

```js
var res = [];
function response(data){
    var chunk = data.splice(0, 1000);

    res = res.concat(
        chunk.map(function(val){
            return val * 2
    }));
    
    if(data.length > 0) {
        // setTimeout 0 表示把它插入到当前事件的结尾，所以原先有些UI的进度事件又能再次执行
        setTimeout(function(){
            response(data)
            }, 0)
    }
}

ajax('http://some.url1', response);
ajax('http://some.url1', response);
```

### 任务
事件循环队列和任务队列是不同的。
任务队列就是挂在事件循环队列的每个tick之后的一个队列。
事件循环的每一轮称为一个tick。
在事件循环的每个tick中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前tick的任务队列末尾添加一个任务。
Promise的异步是基于任务的。

### 此处内容就是记得对回调函数返回的内容做类型检查，不能把控制权交给回调函数

### 确保异步
```js
function asyncify(fn) {
    var orig_fn = fn,
        intv = setTimeout(function(){
            intv = null;
            if(fn) fn();
            }, 0);
        fn = null;
    return function(){
        // 触发调快，在定时器intc触发指示异步转换发生之前
        if(intv) {
            fn = orig_fn.bind.apply(orig_fn,
                [this].concat([].slice.call(arguments))
                );
        }
        // 如果已经异步
        else {
            orig_fn.apply(this, arguments);
        }
    }
}

function result(data){
    console.log(a);
}
var a = 0;
ajax('url...', asyncify(result));
a++;
```