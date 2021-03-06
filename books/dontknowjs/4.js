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
 * 
 * 这样解释还不够规范
 * 如果某个操作数是字符串或者能够通过以下步骤（toString）转换成字符串的话，+ 就能进行 拼接操作
 * 如果其中一个操作数是对象，则首先对其调用ToPrimitive操作，再调用[DefaultValue] 操作
 * * @type {String}
 * 注意：  + "" 会先调用valueOf()方法，然后通过抽象操作toString()方法转为字符串
 * 而String() 则是直接调用toString()
 */
var a = "abcd";
a + 5; // "abcd5"
var b = "2333";
var c = +b; // 2333
var c = 5 + b; // '52333'
var arr1 = [1, 2];
var arr2 = [3,4];
arr1 + arr2;// "1,23,4"

var a = {
	valueOf: () => 42,
	toString: () => 4
}
a + ""; // "42"
String(a); // "4"

[] + {}; // "[object Object]"
// {}.toString() 转换成"[object Object]", [].toString()为空字符串




/**
 * +b  -> toNumber
 * b + "" -> toString
 */



/**
 * 如果想判断传入的若干个参数多少个true
 */

function onlyOne() {
	var sum = 0;
	for(var i = 0; i < arguments.length; i++) {
		sum += Number(!!arguments[i]);
	}
	return sum === 1;
}


// ES6中引入了Symbol类型，它的显示强制类型转换是允许的，
// 但隐式类型转换会产生错误
var s1 = Symbol("cool");
String(s1); // "Symbol(cool)"
var s2 = Symbol('not cool');
s2  + "";// can't convert a Symbol value to a string


// == 和 === 的正确说法
//  == 允许做强制类型转换， === 不允许

// 字符串和数字之间的比较时，会将字符串转换为数字
 // 42 == "42"  
// 对于 "42"字符串会做一个toNumber()转换
// 如果是数字字符串类型，就会转换为数字，比如 Number("0x1a"); => 26

// 布尔值与其他类型比较时，会把布尔值 -> ToNumber