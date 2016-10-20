/*
定义了一个函数通过一个字符串来创建HTML列表。这个函数唯一正式声明了的参数是一个字符。当该参数为 "u" 时，创建一个无序列表 (项目列表)；当该参数为 "o" 时，则创建一个有序列表 (编号列表)。
 */function list(type) {
  var result = "<" + type + "l><li>";
  var args = Array.prototype.slice.call(arguments, 1);
  result += args.join("</li><li>");
  result += "</li></" + type + "l>"; // end list

  return result;
}
var listHTML = list("u", "One", "Two", "Three");

/* listHTML is:

"<ul><li>One</li><li>Two</li><li>Three</li></ul>"

*/