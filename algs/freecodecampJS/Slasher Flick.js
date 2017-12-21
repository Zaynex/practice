/*
打不死的小强！

返回一个数组被截断n个元素后还剩余的元素，截断从索引0开始。
splice(start,deleteCount[,additem1,additem2,...]);
 */
function slasher(arr, howMany) {
  // it doesn't always pay to be first
   arr.splice(0,howMany);
  return arr;
}

slasher([1, 2, 3], 2);
