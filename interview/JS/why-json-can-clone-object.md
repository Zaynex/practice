## JSON
JSON 作为Web服务开发标准的主要原因是它可以有效的 将JSON数据格式转换为 JavaScript 对象。（以前是XML）
早期 JSON 解析器基本就是使用 JavaScript 的 eval() 函数，但它可能会执行一些恶意代码，存在安全隐患。
于是在ES5中对JSON解析进行了规范，定义了全局对象JSON。(没错，JSON.stringify 和 JSON.parse)
对于不支持JSON解析的浏览器可以使用 shim .

### 支持的语法
- 简单值： 字符串,数值,布尔值,null(但不支持 undefined)
- 对象
- 数组(包括对象数组)

### JSON 与 JS 的区别
1. 没有变量 (你看server返回的json数据就知道了)
2. 不允许末尾的分号，因为不是 JavaScript 语句
3. 对象的属性必须加双引号

### JSON.stringify
JSON.stringify() 将 JavaScript 对象序列化为 JSON 字符串
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};

var jsonText = JSON.stringify(book);
// "{"title":"Professional JavaScript","authors":["Nicholas C"],"year":2011}"
```

**注意：全都成为双引号了。**

在序列化 JavaScript 对象时，所有函数及原型成员都会被忽略。此外，undefined 的值也会被跳过。
最终返回的结果都是值为有效 JSON 数据格式的实例属性。

```
var newBook = JSON.parse(jsonText)
newBook === book // false
```

虽然 book 和 newBook 是具有相同的属性，但它们两个是独立的，没有任何关系的对象。
要理解这个过程是先转换为JSON格式的字符串之后，再成为 JavaScript 对象的。

## JSON 有趣却被人忽视的地方

### toJSON()
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011,
    toJSON: function(){
        return this.title
    }
};

var jsonText = JSON.stringify(book);
```
其实我们将 JavaScript 对象执行 JSON格式序列化主要是调用了 toJSON() 方法，所以我们可以手动更改 JSON 格式的序列化方式。

### JSON.stringify() 里第二个参数传值
传入的第二个参数表示过滤出相应的属性
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, ["authors"]);
console.log(jsonText) // {"authors":["Nicholas C"]}
```

### JSON.stringify() 里传第二个参数传函数
在函数里的key 和 value 对应着 JavaScript 对象中的 key 和 value，表示你希望对匹配到 key 进行怎样的序列化操作
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return 2017;
        default:
            return value;
    }
});
console.log(jsonText) // {"title":"Professional JavaScript","authors":"Nicholas C,Zaynex","year":2017}
```

### 自定义修改JSON序列化字符串处理的先后顺序
不难发现，如果在上面又定义了 toJSON, 又在第二个参数里加入了函数进行某些操作，应该听谁的呢？
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011,
    toJSON: function(){
        //  自定义JSON.stringify()
        return {year: this.year}
    }
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return value + '2017';
        default:
            return value;
    }
});
console.log(jsonText) // {"year":"20112017"}
```

高级程序设计三的书上关于序列化的顺序的描述
> 1. 如果存在 toJSON() 方法并且能通过它取得有效的值，则调用该方法。否则按默认顺序执行序列化。
> 2. 如果提供了第二个参数，应用这个函数过滤器，传入函数过滤器的值是 第（1）步返回的。
> 3. 对第（2）步返回的每个值进行相应的序列化。

但额外要注意的是，如果 toJSON 方法中直接返回 value。那么后面的 过滤函数将无法匹配到相应的 `key:value`了.
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011,
    toJSON: function(){
        //  自定义JSON.stringify()
        return this.year;
    }
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, ['authors']);
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return value + '2017';
        default:
            return value;
    }
});
console.log(jsonText); // 2011
```

### 控制缩进
```
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};
// 设置缩进 4格
var jsonText = JSON.stringify(book, null, 4);
console.log(jsonText)
/*
{
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C"
    ],
    "year": 2011
}
*/
```