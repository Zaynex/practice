// 场景: p2 promise resolve p1 promise,则需要等待p1 resolve 之后才 resolve p2
// 时间顺序：先等1s，p2 发现 resolve 的是 p1 于此同时p1也已经过了1s， 所以 再过 2s p1 resolve
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => reject(new Error('fail')), 3000)
// })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(p1), 1000)
// })

// p2.then(result => console.log(result))
//   .catch(error => console.log(error))



// --------time ---------

// console.log('p0')
// const p1 = new Promise((resolve, reject) => {
//   console.log('p1')
//   resolve('p3')
//   console.log('p2')
// })
// p1.then(console.log)
// console.log('p4')
// setTimeout(() => console.log('p5'))





// promise 内部额错误不会影响到外部的代码，简单说就是 promise会吃掉错误
// const someAsyncThing = function () {
//   return new Promise(function (resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2)
//   })
// }

// someAsyncThing().then(function () {
//   console.log('everything is great')
// })
// process.on('unhandledRejection', function (err, p) {
//   console.log('虽然你没有catch promise error 但是我还是可以捕捉到你')
//   throw err
// })

// setTimeout(() => { console.log(123) }, 2000)

// 但是当我当获得这个好消息的时候，发现这个 unhandledRejection事件估计会被node废弃掉，进而通过使promise 链发生错误时终止进程


// const someAsyncThing = function () {
//   return new Promise(function (resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2);
//   });
// };

// someAsyncThing()
//   .catch(function (error) {
//     console.log('oh no', error);
//   })
//   .then(function () {
//     console.log('carry on');
//   });


// setTimeout(() => console.log('p5'))
// console.log('p1')
// // 获得一个空resolve的promise对象， resolve 总是在当前事件队列的底部执行
// const p1 = Promise.resolve()
// console.log('p2')
// p1.then(() => console.log('p4'))
// console.log('p3')


// function getFoo () {
//   return new Promise(function (resolve, reject) {
//     resolve('foo')
//   })
// }

// const g = function* () {
//   try {
//     const foo = yield getFoo()
//     console.log(foo)
//   } catch (e) {
//     console.log(e)
//   }
// }

// function run (generator) {
//   const it = generator()
//   function go (result) {
//     if (result.done) return result.value

//     return result.value.then((value) => {
//       return go(it.next(value))
//     }).catch((err) => go(it.throw(err)))
//   }

//   go(it.next())
// }
// run(g)


// 让同步函数同步执行，异步函数异步执行的方法
// 1 自执行匿名函数，如果 f是同步则立即执行，如果是异步则异步执行
const f = () => console.log('ffff')

  (async () => f())()
console.log('next')

  // 2 promise 将函数执行的结果放到 resolve 中 一直等待 f()返回结果才会 resolve 最终值
  (() => new Promise(
    resolve => resolve(f())
  )
  )()

// 3 promise.try(f) 直接转
// 好处是
Promise.try(f).then().catch()
// 使用catch 可以捕获错误
// 之前的方式对于同步的函数来说如果出现错误时只能在外层通过 try catch 来实现


// 12.22 完。

