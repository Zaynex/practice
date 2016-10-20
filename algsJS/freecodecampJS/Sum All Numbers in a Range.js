/**
 * 一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和。
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function sumAll(arr) {
   var a = Math.max(arr[0], arr[1]);
   var b = Math.min(arr[0], arr[1]);
   var newArr = [];
   for(var i = b; i <= a; i++) {
       newArr.push(i);
   }
   var sum = newArr.reduce(function(a,b){
     return a+b;
   });
  return sum;
}

sumAll([1, 4]);
