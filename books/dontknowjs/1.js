// 检测 null
var a = null;
(!a && typeof a === "object");// true


// 函数是object的一个子类型。拥有属性。
// 函数的属性是其声明函数的参数的个数

function obj(b,c) {
	// body...
}
console.log(obj.length);//2

typeof [1,2,4] === 'object';// true

/**
 * 数组通过数字进行索引，但他们也是对象，所以也可以包含字符串键值和属性
 * 但这些并不计算在数组长度内
 */
var a = [];
a[0] = 1;
a['foo'] = 2;
console.log(a.length); //1

/**
 * 类数字转换为数组
 */

var arr = Array.prototype.slice.call(arguments);
// 或者
arr = Array.from(arguments);


var a = 'abc';
// var a = new String('abc');
Array.prototype.reverse.call(a);// Cannot assign to read only property '0' of object '[object String]'
// 由于返回值仍然是字符串"foo"的一个封装对象
console.log(a);
