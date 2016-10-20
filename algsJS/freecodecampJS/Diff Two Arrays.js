/**
 * 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 */
function diff(arr1, arr2) {
  var newArr = [];
  // Same, same; but different.
  for(var i = 0; i < arr1.length; i++) {
  	if(arr2.indexOf(arr1[i]) <0) {
  		newArr.push(arr1[i]);
  	}
  }
  for(var i = 0; i < arr2.length; i++) {
  	if(arr1.indexOf(arr2[i]) < 0) {
  		newArr.push(arr2[i]);
  	}
  }
  return newArr;
}

diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);