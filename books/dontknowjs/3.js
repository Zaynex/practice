/**
 * 所有typeof 返回值 为 object 的对象都包含一个内部属性[[class]]
 * 这个属性无法直接访问，可通过Object.prototype.toString.call() 来查看
 */


/**
 * 采用这种方式创建数组比较稳妥,返回值都是undefined
 * @type {[type]}
 */
var a = Array.apply(null, {length: 3}); // 将 {length: 3} 作为函数的参数，传入其实就是undefined
console.log(a); // [undefined, undefined, undefined]

// var a = Array(undefined, undefined, undefined);
a.forEach(v => console.log(v))
/**
 * 虽然看起来和下面的一样，但实际的结果却不一样
 * @type {Array}
 */
var c = [];
c.length = 3; // [, , ,]
c.forEach(v => console.log(v)); // 因为数组中不存在任何单元，所以不会执行遍历


// 之前有一个字符串处理的问题
// 报错的情况是// Cannot assign to read only property '0' of object '[object String]'
// 因为字符串是基本类型，