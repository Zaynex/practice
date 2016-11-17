### 变量
let 不存在变量提升。

```js
console.log(foo);//undefined
console.log(bar);//Uncaught ReferenceError: bar is not defined
var foo = 2;
let bar = 2;
```
