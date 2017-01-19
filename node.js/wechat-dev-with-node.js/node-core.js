module.exports 是真正的接口，exports 只不过是它的一种辅助工具。最终返回调用的是modules.exports 而不是 exports

module.exports = 'Exports IT!';
exports.name = function () {
  console.log('hello world');
}


var hello = require('./exports');
console.log(hello.name())

发现报错：对象hello没有name方法
exports模块忽略了exports收集的name方法，返回了一个字符串“Exports IT!”。

当modules相互引用时，根据node.js的模块缓存策略。只会加载一次，后面的加载相同的模块会被忽略。

创建一个Promise的实例，后面即可调用then方法
参数处理：
除了callback以外，其他东西都放进新的函数的参数里。

返回值处理：
返回一个Promise实例对象

结果处理：
使用resolve 和 reject 对成功和失败进行处理


connect 模块的  connect().use 中间件是有顺序的
越清晰的路由地址匹配放前面。

express就是 connect模块的集合


// =============  
// connect
// =============
var connect = require('connect'),
	http = require("http")

var app = connect()

app.use('/', function fooMiddleware(req, res, next) {
	res.end('Hello from connect2')
})
app.use('/2', function fooMiddleware(req, res, next) {
	res.end('Hello from connect2')
})

// =============  express
var express  = require('express');
var app      = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/2', function (req, res) {
  res.send('Hello World2')
})

// 随机端口3000 - 10000 之间
app.listen(4001)


connect中间件以app为维度挂载中间件
express以 中间件为维度，可能某个中间件下面还有中间件

