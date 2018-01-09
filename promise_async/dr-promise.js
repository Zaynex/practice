/**
 * Author: dr-js
 * https://github.com/dr-js/dr-js
 **/

// import { __LOG__ } from 'configs/env'

const MUTE_ERROR = (error) => { console.error(error) }

const createQueueStatus = (size = 0, isValid = true) => ({
  getSize: () => size,
  increaseSize: () => ++size,
  decreaseSize: () => --size,
  getIsValid: () => isValid,
  invalid: () => (isValid = false)
})

const createInsideOutPromise = () => {
  let promiseResolve, promiseReject
  return {
    promise: new Promise((resolve, reject) => {
      promiseResolve = resolve
      promiseReject = reject
    }),
    resolve: (value) => {
      if (promiseResolve === undefined) return
      const resolve = promiseResolve
      promiseResolve = promiseReject = undefined
      return resolve(value)
    },
    reject: (error) => {
      if (promiseReject === undefined) return
      const reject = promiseReject
      promiseResolve = promiseReject = undefined
      return reject(error)
    }
  }
}

const createAsyncTaskQueue = (onQueueError = MUTE_ERROR) => {
  let queueStatus, queueTail
  // 初始化
  const resetTaskQueue = () => {
    queueStatus && queueStatus.invalid()
    queueStatus = createQueueStatus()
    queueTail = Promise.resolve('QUEUE_HEAD')
  }
  const getTaskQueueSize = () => queueStatus.getSize()
  const pushTask = (asyncTask) => { // task is async function
    const { promise, resolve, reject } = createInsideOutPromise()
    // 转 promise
    const taskPromise = queueTail.then(asyncTask).catch(MUTE_ERROR)
    queueStatus.increaseSize()
    queueTail = promise
    taskPromise
      .then(() => {
        queueStatus.decreaseSize()
        resolve()
      }) // the promise chain is not chained up directly
    return taskPromise
  }
  resetTaskQueue()
  return { resetTaskQueue, getTaskQueueSize, pushTask }
}

const { pushTask, getTaskQueueSize } = createAsyncTaskQueue()


function timeout (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// const p3 = new Promise((resolve, reject) => {
//   console.log('p3 start')
//   setTimeout(() => {
//     resolve('p3 is ready')
//   });
// })

// const p1 = new Promise((resolve, reject) => {
//   console.log('p1 start')
//   setTimeout(() => {
//     console.log('fetch p3')
//     resolve(p3)
//   }, 1000);
// })
// const p2 = new Promise((resolve, reject) => {
//   console.log('p2 start')
//   console.log('fetch p1')
//   resolve(p1)
// })
// p2.then((res) => console.log(res))



// const normalPromise1 = async function () {
//   await timeout(1000)
//   console.log('normalPromise1')
// }
// const normalPromise2 = async function () {
//   await timeout(1000)
//   console.log('normalPromise2')
// }
// const normalPromise3 = async function () {
//   await timeout(1000)
//   console.log('normalPromise3')
// }
// const normalPromise4 = async function () {
//   await timeout(1000)
//   console.log('normalPromise4')
// }

// const promiseList = [normalPromise1, normalPromise2, normalPromise3, normalPromise4]

// async function processArray (promiseList) {
//   for (const promise of promiseList) {
//     await promise()
//   }
// }
// processArray(promiseList)



// const taskPromise1 = pushTask(async () => {
//   console.log(getTaskQueueSize(), 'getTaskQueueSize')
//   await timeout(1000)
//   console.log('taskPromise1')
// })

// const taskPromise2 = pushTask(async () => {
//   console.log(getTaskQueueSize(), 'getTaskQueueSize')
//   await timeout(1000)
//   // throw new Error('Error in taskPromise2')
//   console.log('taskPromise2')
// })

// const taskPromise3 = pushTask(async () => {
//   console.log(getTaskQueueSize(), 'getTaskQueueSize')

//   await timeout(1000)
//   console.log('taskPromise3')
// })

// const taskPromise4 = pushTask(async () => {
//   console.log(getTaskQueueSize(), 'getTaskQueueSize')
//   await timeout(1000)
//   console.log('taskPromise4')
// })


// async 可以理解为 promise creator,只有在 函数执行时才会进行下一步
// 而创建的构造函数则直接进行
const asyncFunc = async function () {
  return await new Promise((resolve, reject) => {
    console.log('async')
    resolve('asyncfunc')
  })
}
// asyncFunc().then(res => console.log(res))

const emptyPromise = Promise.resolve('empty promise,I start')
const a = asyncFunc().then()
// 传入一个回调函数，那么then 依赖于 这个回调函数的结果
const wrapPromise1 = emptyPromise.then(Promise.resolve('1111'))
// const wrapPromise2 = emptyPromise.then(wrapPromise1)
// const wrapPromise3 = emptyPromise.then(wrapPromise2)
wrapPromise1.then(console.log)

