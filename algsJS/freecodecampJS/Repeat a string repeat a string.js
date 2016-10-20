/*
重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。
 */
function repeat(str, num) {
  // repeat after me
  var newSrr="";
  	if(!String.prototype.repeat){
  		while(num > 0) {
  			newSrr += str;
  			num--;
  		}
  		return newSrr;

  	}
	return  num < 0? "" :str.repeat(num);
}

repeat("abc", 3);