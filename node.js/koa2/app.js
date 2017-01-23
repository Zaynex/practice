const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
//对每个HTTP请求，进行异步函数处理
//参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response
//next是koa传入的将要处理的下一个异步函数。

app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
	await next(); //调用下一个中间件
})

app.use(bodyParser());



//增加控制层
app.use(controller());

app.listen(3000);
console.log('app started at porrt 3000')	