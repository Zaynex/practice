function timeout (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// async function asyncPrint (value, ms) {
//   await timeout(ms)
//   console.log(value)
// }

// asyncPrint('hello world', 5000).then(() => console.log('我在所有 asyncPrint内部函数执行返回之后'))


// 因为 async函数返回的是 promise 对象，所以也可以 async 封装一层
// 效果是一样的。
async function timeout (ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// async function f () {
//   throw new Error('Error')
// }

// f().catch(e => console.log(e))



// async function fawait () {
//   return await 123
// }

// 等同于
// async function fawait () {
//   return Promise.resolve(123)
// }
// fawait().then(v => console.log(v))


// 因为 await 后面跟的是 promise 对象，运行结果可能rejected，导致后面的函数被中断
// 所以最好加 try{} catch(){} 或者直接在 promise 后面跟 catch

// async function tryCatchFunc () {
//   try {
//     await somethingAsync()
//   } catch(err) {
//     console.log(err)
//   }
// }

// async function tryCatchFunc() {
//   await somethingAsync().catch( err => console.log(err))
// }



// const delayLog = console.log.bind(console)
const delayLog = async (item) => {
  await timeout(1000)
  console.log(item)
}
// async function processArray (array) {
//   array.forEach(async (item) => {
//     await delayLog(item)
//   })
//   console.log('Done!')
// }

const processArraySort = [1, 2, 3, 4]
processArray(processArraySort)
// 如果 delayLog 是一个同步函数，那么执行顺序
// 1
// 2
// 3
// 4
// done!

// 如果是个 异步函数，那么 Done 就会先执行了
// done
// 1
// 2
// 3
// 4

// 这就没法保证后面 Done是在所有异步请求完成之后再触发的
// 不过可以采用  while of 循环 利用 iterator

// async function processArray (array) {
//   for (const item of array) {
//     await delayLog(item)
//   }
//   console.log('Done!')
// }


// 并发请求   parallel

async function processArray (array) {
  // 组成一个新的 promise 数组
  const promises = array.map(delayLog)
  await Promise.all(promises)
  console.log('Done!')
}
// 1
// 2
// 3
// 4
// done!


// generator 待续