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


console.log('p0')
const p1 = new Promise((resolve, reject) => {
  console.log('p1')
  resolve('p3')
  console.log('p2')
})
p1.then(console.log)
console.log('p4')
setTimeout(() => console.log('p5'))