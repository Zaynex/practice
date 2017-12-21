/**
 * 确保字符串的每个单词首字母都大写，其余部分小写。

像'the'和'of'这样的连接符同理。
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function titleCase(str) {
  var newArray = str.toLowerCase().split(" ");
  //先转化为小写，保存为数组
  for(var i=0; i<newArray.length; i++) {
      var char = newArray[i].charAt(0);
      newArray[i] = newArray[i].replace(char, function (char){
		//对每个数组元素执行函数替换第一个字母
		return char.toUpperCase();
      });
  }
  return newArray.join(" ");
}



function titleCase(str) {
	var newArray = str.toLowerCase().split(" ");
	var result = newArray.map(function(val){
		return val.replace(val.charAt(0), var.charAt(0).toUpperCase);
	})
	return result.join(" ");
}

function titleCase(str) {
	var newArray = str.toLowerCase().split(" ");
	for (var i in newArray) {
		newArray[i] = newArray[i].replace(newArray[i].charAt(0), newArray[i].charAt(0).toUpperCase())
	};
	return newArray.join(" ");
}

function titleCase(str) {
	 return str.replace(/\w\S*/g, function (word) {
	 	return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
	 });
}

function titleCase(str){
	return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
	//   /( |^)[a-z]/g - 匹配出整个字符串最开始的首字母以及以空格分隔的每个单词的首字母。
}
titleCase("I'm a little tea pot");