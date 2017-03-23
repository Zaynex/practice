## HTML5

### H5拓展方法遍历元素
（1）childElementCount：返回子元素（不包括文本节点和注释）的个数。
（2）firstElementChild：指向第一个子元素；
（3）lastElementChild：指向最后一个子元素；
（4）previousElementSibling：指向前一个同辈元素；
（5）nextElementSibling：指向后一个同辈元素；
```
var i,len,	
child = element.firstChild;
while(child != element.lastChild){
	if(child.nodeType == 1){  //检查是否为元素，避免文本节点干扰
		processChild(child);
	}
	child = child.nextSibling;
}

//使用 Element Traversal
var i,len,
child = element.firstElementChild;
while(child != element.lastElementChild){
	processChild(child);
	child = child.nextElementSibing;
}
```
支持该Element Traversal 规范的浏览器 IE9+。

## HTML5
### getElementsByClassName
在IE9+的版本可以使用该方法直接添加calss名。

### classList
```
var div = document.getElementsByTagName("div")[0];
var classNames = div.className.split(/\s+/);

var pos = -1,
	i,
	len;
for(i=0, len=classNames.length; i<len; i++){
	if(classNames[i] == "user"){
		pos = i;
		break;
	}
}

classNames.splice(i,1); //删除类名

div.className = classNames.join(" ");
//添加类名拼成字符串重新设置
// var div = document.getElementsByTagName("div")[0];


// div.classList.remove("user");
		
	div.classList.toggle("user");//如果有user的className就删除，如果没有就新建一个
	div.classList.add("user");//新建className 为 user的值，如果值已存在，则不添加
	if(div.classList.contains("bd")&&div.classList.contains("user")){
	 // code
	}
```
除非要删除所有雷鸣或者重写所有class属性，使用classList是很不错的选择。
classList属性支持浏览器有火狐 chrome ，其他的都不行。

### HTML5焦点管理
```
var button = document.getElementById('mybutton');
button.focus();
alert(document.activeElement === button); //true
alert(document.hasFocus());
//通过检测文档是否获得了焦点，可以知道用户是否正在与页面交互
```

### innerHTML
返回的是调用元素的所有子节点（包括元素、注释和文本节点）
写入模式下，会把里面的内容解析成DOM熟，替换调用元素原来的所有子节点。

### 内存与性能问题
```
for (var i=0,len=values.length; i<len; i++){
	ul.innerHTML += "<li>" + values[i] + "</li>";
}//避免循环操作，每次循环要从innerHTML读取一次信息，而设置innerHTML相当于创建HTML解析器，但是创建和销毁解析器也会带来很大性能损失。因此要将innerHTML访问次数控制在合理范围

//解决办法，单独构建字符串，然后一次性将结果字符串赋值给innerHTML.

var itemsHtml = "";
for (var i=0, len=values.length; i<len ;i++){
	itemsHtml += "<li>" + values[i] + "</li>";
}
ul.innerHTML = itemsHtml;
```

### children
```
var childCount = element.children.length;
var firstChild = element.children[0];
```
由于浏览器在处理文本空白符中存在差异，因此出现了该属性。

### containes
containes方法确认该节点是否包含子代节点。

```
var result = document.documentElement.compareDocumentPosition(document.body);
		alert(!!(result & 16));
		//20
        //16表示的是被包含（给定的节点是参考节点的后代）

		function contains(refNode ,otherNode){
			if (typeof refNode.contains == "function" &&(!client.engine.webkit || client.engine.webkit >=522)){
				return refNode.contains(otherNode);
			} else if (typeof refNode.compareDocumentPosition == "function"){
				return !!(refNode.compareDocumentPosition(otherNode) &16);
			} else {
				var node = otherNode.parentNode;
				do {
					if (node ===refNode){
						return true;
					}else {
						node = node.parentNode;
					}
				}while (node !== null);
				return false;
			}
		} 
```

