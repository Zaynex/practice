/**
 * 强制类型转换
 *
 */

/**
 * 1.类型转换发生在静态类型语言的编译阶段
 * 2.强制类型转换发生在动态类型语言的执行阶段
 */

JSON.stringify(43); // "43"
JSON.stringify("43"); // ""43""
JSON.stringify('43'); // "'43'"

// 在遇到undefined, function 和 symbol 时会自动忽略，在数组中则会返回 null
JSON.stringify(undefined); // undefined
JSON.stringify(function(){}); // undefined

// 对包含循环引用的对象执行JSON.stringify会出错


/**
 * + 号为一元运算符时转换成数字相加，字符串加数组会生成NaN
 * 普通 加法会转成字符串拼接
 * @type {String}
 */
var a = "abcd";
a + 5; // "abcd5"
var b = "2333";
var c = +b; // 2333
var c = 5 + b; // '52333'


/**
 * +b  -> toNumber
 * b + "" -> toString
 */

/**
 * ~ 和 ! ，前者不仅做强制类型转换为布尔值，还进行字位反转，返回2的补码
 * ~x = -(x+1)
 */
var a = 'loll'
if(~a.indexOf('lo')) {
	// if 匹配
}
// if(a.indexOf('lo')>-1) {
// 	// 匹配
// }

