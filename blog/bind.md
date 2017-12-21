## bind

通过bind生成的函数所接受的第一个参数为原函数，后面所携带的参数为原函数所使用的参数
```
const a = (arg1, arg2) => arg1 + arg2
const b = (func,arg1, arg2) => func(arg1, arg2);
const c = b.bind(null, a);
const result = c(1, 2); 
console.log(result);
```

## apply/call

用法：
```
fun.apply(thisArg, [argsArray])
```
第一个传入的参数 thisArg:
使一个函数拥有指定的 `this` 值。
，指定的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的自动包装对象。
后面的数组参数 argsArray:
一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。

常见用法
```
let slice = Array.prototype.slice

result = slice.apply([1,2,3], [0, 2])
```

