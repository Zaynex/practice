/*
金克斯的迫击炮！

实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。

当你完成不了挑战的时候，记得开大招'Read-Search-Ask'。
 */
function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments, 1);
  function find(arr1){
  	for(var i = 0; i < args.length; i++) {
  		if(arr1 == args[i]) {
  			return false;  		}
  	}
  	return true;
  }
  return arr.filter(find);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);