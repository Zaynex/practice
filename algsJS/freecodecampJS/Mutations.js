/*
蛤蟆可以吃队友，也可以吃对手。

如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。

举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。

["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。

["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。
 */
function mutation(arr) {
  str1 = arr[0].toLowerCase();
  str2 = arr[1].toLowerCase();
  for(var i = 0, len = str2.length; i < len; i++) {
  	if(str1.indexOf(str2[i]) <0) {
  		return false;
  	}
  }
  return true;
}

function mutation(arr) {
	str1 = arr[0].toLowerCase();
    str2 = arr[1].toLowerCase();
    return ![].some.call(str2, function(n){
    	return !~str1.indexOf(n);
    });
}

function mutation(arr) {
	for (var i = 0; i < arr[1].length; i++) {
		if(!new RegExp(arr[1][i],'gi').test(arr[0])) {
			return false;
		}
	}
	return true;
}


mutation(["hello", "hey"]);
