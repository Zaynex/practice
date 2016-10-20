/*

猴子吃香蕉可是掰成好几段来吃哦！

把一个数组arr按照指定的数组大小size分割成若干个数组块。

例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];

chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];
arr.slice(begin[,end]);
 */
function chunk(arr, size) {
  // Break it up.
  var newArr = [];
  for(var i = 0; i < arr.length; i+=size) {
	newArr.push(arr.slice(i,i + size));//切割完之后生成一个数组
  }
  return newArr;
}

chunk(["a", "b", "c", "d"], 2);


