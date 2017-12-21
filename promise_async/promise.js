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
const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2)
  })
}

someAsyncThing().then(function () {
  console.log('everything is great')
})
process.on('unhandledRejection', function (err, p) {
  console.log('虽然你没有catch promise error 但是我还是可以捕捉到你')
  throw err
})

setTimeout(() => { console.log(123) }, 2000)

// 但是当我当获得这个好消息的时候，发现这个 unhandledRejection事件估计会被node废弃掉，进而通过使promise 链发生错误时终止进程


const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
  .catch(function (error) {
    console.log('oh no', error);
  })
  .then(function () {
    console.log('carry on');
  });