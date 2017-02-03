function foo(gen) {
	var ctx = this;
	var args = slice.call(arguments, 1);

	return new Promise(function(resolve, reject) {
		
		//pending: 初始状态, 非 fulfilled 或 rejected.
		//fulfilled: 完成（成功）的操作
		//rejected: 拒绝（失败）的操作.
		onFulFilled(); 
		  /**
			* @param {Mixed} res
			* @return {Promise}
			* @api private
			*/
		function onFulfilled(res) {
			var ret;
			try {
				ret = gen.next(res);
			} catch(e) {
				return reject(e);
			}
			next(ret);
		}

		/**
	     * @param {Error} err
	     * @return {Promise}
	     * @api private
	     */

		function onRejected(err) {
			var ret;
			try {
				ret = gen.throw(err);
			} catch(e) {
				return reject(e);
			}
			next(ret)
		}
	     // generator执行器
    // 如果ret.done，返回ret.value
	    function next(ret) {
	     	if(ret.done) return resolve(ret.value);
	     	var value = toPromise.call(ctx, ret.value);
	     	if(value && isPromise(value)) return value.then(onFulFilled, onRejected)

	     	return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
	    }
	})
}




中间件是Application提供请求处理的扩展机制，主要抽象HTTP协议里的request、response如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。

http协议是无状态协议，所以http请求的过程可以这样理解，请求（request）过来，经过无数中间件拦截，直至响应（response）为止。





// 1.x


var koa = require('koa');
var app = koa();

// logger

app.use(function *(next){
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';
});



// 2.x
var app = new Koa();
// common function 
// 使用promise处理，而1.x是通过yield处理
app.use((ctx, next)=>{
	const start = new Date();
	return next().then() => {
		const ms = new Date - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
	}
});

app.use(ctx => {
	ctx.body = 'hello koa';
})


// 2.x generate]or function
//2.x中间件generatorFunction的跳到下一个中间件是yield next();，而不是1.x用的yield next;
//2.x中间件generatorFunction被co.wrap包裹了，被转换成function *(){}
//2.x中间件generatorFunction的参数多了ctx，和上面common function说的一样，上下文ctx被显示声明了，统一写法

var co = require('co')
app.use(co.wrap(function *(ctx, next) {
	const start = new Date();
	yield next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}));

app.use(ctx => {
	ctx.body = 'hello koa';
})

//  async 函数/
// 无需执行器
//  await直接异步Promise方法	
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//为什么会有 ctx,最主要的原因是
app.use(async (ctx, next) => {
	await next();
})
//这种情况下，使用this是万万不可能的。
//因为 Arrow Function是 Lexical scoping（定义时绑定）, this指向定义Arrow Function时外围, 而不是运行时的对象。


// 2.x new Koa()

// module.exports = class Application extends Emitter {
// 	constructor() {
// 		super();

// 		this.proxy = false;
// 		this.middleware = [];
// 		this.subdomainOffset = 2;
// 	    this.env = process.env.NODE_ENV || 'development';
// 	    this.context = Object.create(context);
// 	    this.request = Object.create(request);
// 	    this.response = Object.create(response);
// 	}
// }
app.use(ctx => {
	ctx.body = 'hello koa'
})
app.listen(3000);


var co = require('co')
var debug = require("debug")("v0")

module.exports = {
	middleware: [],
	use: function (fn) {
		debug('use:' + fn);
		this.middleware.push(fn);
		return this
	},
	callback: function(cb) {
		const fn = this.compose(this.middleware);
		debug('callback compose fn=' + fn)

		co(fn).then(cb, function(err) {
			console.error(err.stack)
		})
	},
	compose: function(middleware) {
		debug('compose:' + middleware);
		return function *(next) {
			if(!next) {
				next = function *(){}
			}
			var i = middleware.length;

			while(i--) {
				debug('compose middleware[' + i + ']=: ' + middleware[i])
				next = middleware[i].call(this, next)
				debug(next)
			}
			return yield *next;
		}
	}
}















const Koa = require('koa');
const app = new Koa();

var co = require('co')

// m1
app.use((ctx, next) => {
  console.log('第1个中间件before 1')
  return next().then(() => {
    // after
    console.log('第1个中间件after 2')
  })
});

app.use((ctx, next) => {
  console.log("3");
  return next().then(() => {
    console.log('4')
  })
})

// response

app.use(ctx => {
  console.log('业务逻辑处理')
  return ctx.body = {
    data: {},
    status: {
      code  : 0,
      msg   :'sucess'
    }
  }
});
//before按照中间件顺序依次向下处理
// 业务逻辑处理
// after按照中间件相反顺序向上执行

app.listen(3000);