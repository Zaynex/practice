## 数据类型
5种基本类型
- Undefined
- Null
- String
- Number
- Boolean

1种复杂类型
- Object

## typeof 操作符
`typeof` 是一个操作符，它检测变量的数据类型
- "undefined"
- "boolean"
- "string"
- "function"
- "number"
- "object" (变量为null时检测结果也是object，表示空对象指针)

比较适合检测基本类型

虽然 函数也是特殊的对象，但可以通过
`typeof` 检测是否为`function`

## instanceof 
只能判断是基本类型还是引用类型。因为它对所有引用类型都返回`true`.
`ECMAScipt`规定所有引用类型都是`Object`的实例。

## 检测是否为数组
```
function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
}
```
