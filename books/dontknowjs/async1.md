
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