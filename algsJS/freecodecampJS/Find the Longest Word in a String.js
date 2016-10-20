/**
 * 找到提供的句子中最长的单词，并计算它的长度。

函数的返回值应该是一个数字。
 * [findLongestWord description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function findLongestWord(str) {
   var newArray = str.split(" ");
    var max = newArray[0].length; 
    for(var i=1; i<newArray.length; i++) {
        if(newArray[i].length > max){
            max = newArray[i].length;
        }
    }
  return max;
}

findLongestWord("What if we try a super-long word such as otorhinolaryngology");