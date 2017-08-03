/**
####
1. Set 类型的每个数都是唯一的，且不会发生类型转换，类似于 === ，但只能存放一个 NAN
2. Set 的实例具有 add 方法，可以添加不重复的值，返回的是Set
3. delete： 返回 boolean 表示是否删除成功
4. has: 返回 boolean 表示是否具有该成员
5. clear: 清除所有成员，没有返回值
6. Array.from 可以将 Set 结构转换为数组
7. set 的键和值都是同一个
8. 数组中 map filter forEach 都在 Set 使用
9. 扩展运算符... 内部可以使用 for of 循环，也可以用于 Set 结构
 */


const log = console.log.bind(console)

// const s = new Set()
let arr = [1,2,3,3,2,2,2,221,3,33,4,4]

// arr.forEach(x =>s.add(x))

// for(let i of s) {
//     log(i)
// }
/**
1
2
3
221
33
4
 */

const set = new Set([1,2,3,4,4])
console.log([...set]) // [1, 2, 3, 4]
console.log(set.size) // 4

function divs() {
    return [...document.querySelectorAll('div')]
}

const set1 = [...new Set(arr)] // 新版数组去重
log(set1)
log((new Set(arr)).add(1111))

const s = new Set()
s.add(1).add(2)
s.size
s.has(1)
s.has(3)
s.delete(2)
s.has(2)


/*数组去重*/

function dedupe(arr){
    return Array.from(new Set(arr))
}


let set3 = new Set(['red','green','blue'])

log(set3.keys())
log(set3.entries())
log(set3.values())


/**
 * WeakSet
 * 不含重复的值，与 Set 的区别
 * 1. 成员只能是对象
 * 2. 成员中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用
 * WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息，只要这些对象在外部消失，它在 WeakSet 里面就会自动消失
 * WeakSet 不可遍历。
 * 
 * 可以保存 DOM节点，而不必担心 节点从文档删除之后，会引发内存泄漏
 */

 const foos = new WeakSet()
 class Foo {
    constructor() {
        foos.add(this)
    }
    method() {
        if(!foo.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
        }
    }
 }