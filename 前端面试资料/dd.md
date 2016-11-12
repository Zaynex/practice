### 闭包
```js
//var a=["a","b","c","d"] 每过 1 秒 alert 一下数组中的值

var arr = ['a','b','c','d'];
/*
这里显然没有达到每秒出现一个的要求，是一个同步调用函数
for(var i = 0; i < arr.length;i++){
    setTimeout((function(a){
        console.log(arr[a]);
    })(i),1000)
}
 */

for(var j = 0; j <4; j++){
    (function(i){
        setTimeout(function(){
            console.log(arr[i]);
        }, (i+1)*1000);
    })(j);
}
//在我组件webapp开发时有用到闭包
```