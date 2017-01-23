const Koa = require('koa');
const app = new Koa();

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

//对每个HTTP请求，进行异步函数处理
//参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response
//next是koa传入的将要处理的下一个异步函数。

// app.use(async (ctx, next) => {
// 	console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
// 	await next(); //调用下一个中间件
// })

router.get('/', async (ctx, next)=> {
	ctx.response.body = `<h1>Index</h1>
	<form action="/signin" method="post">
		<p>Name:<input name="name" value="koa"></input></p>
		<p>Password:<input name="password" value="password"></input></p>
		<p><input type="submit" value="Submit"></p>
	</form>`;
})
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

app.use(bodyParser());
//增加中间件
app.use(router.routes());

app.listen(3000);
console.log('app started at porrt 3000')	