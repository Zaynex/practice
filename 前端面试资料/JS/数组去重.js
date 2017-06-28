/**
 * 要求字符中有多个空格时只保留一个空格
 * @type {String}
 */
var str = 'sdsd sds dsd      dddddd    ';
// console.log(str);
// var newStr = str.replace(/\s+/g, ' ');
// // console.log(newStr);
// // 末尾会多一个空白字符
// // 如果要去掉的话也方便
// newStr = newStr[newStr.length - 1] === " " ?  newStr.slice(0, newStr.length -1) : newStr


/**
 * 第二种方式,当时没清楚split()到底是怎样的
 * 其实用 split(" ")匹配后如果后面存在多个相同的空格，那么就会生成空字符串的数组
 * 读的是空格，分开的是空隙
 */
// var arr = str.trim().split(" ");
// var newArr = arr.filter(function(value){
// 	return !!value
// })
// newArr = newArr.join(" ");
// console.log(arr);
// console.log(newArr);


/**
 * 第三种方式
 * 使用for循环遍历判断每个字符串然后再存入到新的字符串中
 * 
 */

//slice 不会修改原数组
//splice 会修改原数组
str = str.split("");
for(var i = 0; i < str.length; i++) {
	if(str[i] === ' ') {
		for(var j = i+1; j < str.length; j++) {
			if(str[j] === ' ') {
				// console.log(str);
				// 本以为 str.splice是可以的，但悲催的是报错了，只能转换成数组
				// 具体原因，暂时不明
				// 存取字符串数字布尔值的属性时临时创建的对象叫做包装对象，由于字符串数字和boolean值的属性都是只读的，并且不能给他们定义新属性，所以用call会报错
				// 只能先转化成数组
				str.splice(j, 1);
			}
		}
	}
}
console.log(str = str.join(""));
