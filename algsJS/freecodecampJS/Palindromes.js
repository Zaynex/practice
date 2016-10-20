/**
 * 如果给定的字符串是回文，返回true，反之，返回false。

如果一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样，那么这个字符串就是palindrome(回文)。

注意你需要去掉字符串多余的标点符号和空格，然后把字符串转化成小写来验证此字符串是否为回文。


 * palindrome 方法一  
 先按照要求去除多余符号，利用split("")转换为数组，reverse()数组反转，join("")转换成字符串
 * * @param  {[string]} str [description]
 * @return {[boolean]}     [description]

 */
function palindrome(str) {
  // Good luck!
  var re = /[\W_]/g;//// 或者 var re = /[^A-Za-z0-9_]/g;
  var fullStr = str.toLowerCase().replace(re, "");
  var newStr = fullStr.split("").reverse().join("");
  return fullStr === newStr;
}


function palindrome(str) {
	var re = /[\W_]/g;
	var fullStr = str.toLowerCase().replace(re, "");
	var len = fullStr.length;
	var mid = len/2;
	for(var i=0 ;i < mid; i++) {
		if(fullStr[i] !== fullStr[len - 1 - i]) {
			return false;//有一个不相等就跳出循环
		}
	}
	return true;//没有错误，返回true
}




palindrome("eye");


