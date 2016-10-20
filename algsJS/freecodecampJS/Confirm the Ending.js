/*
检查一个字符串(str)是否以指定的字符串(target)结尾。

如果是，返回true;如果不是，返回false。
substr(start,length);
start可以取符号
 */
function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  return target === str.substr(-target.length,target.length);
}

function
confirmEnding("Bastian", "n");
