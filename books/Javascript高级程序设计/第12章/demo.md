## 样式
### 访问元素的样式
通过javascript属性访问css样式如style.backgroundImage(驼峰表示法)。
- 由于float是保留字，因此使用cssFloat(!IE)\styleFloat(IE).

#### 移除默认属性
```
element.style.removeProperty("border");
```
在不确定给某个给定的CSS属性拥有什么默认值的情况下使用该方法。只要移除相应的属性，就可以为元素应用默认值。

#### 获取样式值
getComputedStyle()//(!IE)
但是部分浏览器在返回颜色时会转换成RGB格式。
CurrentStyle()//(IE)

### 元素大小
### 偏移量
offsetHeight:元素占用的垂直空间（包括width+border+滚动条高度（可见的））
offsetWidth:元素占用的水平空间（包括height+border+滚动条宽度（可见的））
offsetTop:元素相对offsetParent的垂直距离（父级元素）
offsetLeft:元素相对offsetParent的水平距离（父级元素）
```
function getElementLeft (element) {
	var actuallLeft = element.offsetLeft;
	var current = element.offsetParent;

	while(current !== null) {
		actuallLeft += current.offsetLeft;
		current = current.offsetParent;
	}

	return actuallLeft;
}

function getElementTop(element) {
	var actuallTop = element.offsetTop;
	var current = element.offsetParent;

	while(current !== null) {
		actuallTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actuallTop;
}

```
一般来说，页面中的元素都包含几个div，但最外层又是body元素，所以getElementleft()与getElementTop()会返回与offsetLeft 和 offsetTop 一样的值。
所有这些偏移量都是只读的，每次访问也需要重新急速那。因此尽量避免重复访问这些属性，利用一个变量保存起来，以提高性能。

#### 客户区大小
client dimension,指元素内容及其内边距所占据的空间大小。
clientHeight: height+padding
clientWidth: width+padding

#### 浏览器视口大小
```
function getViewport(){
	if(document.compatMode == "BackCompat"){
		return {
			width: document.body.clientWdith,
			height: document.body.clientHeight
		};
	}else {
		return {
			width: document.documentElement.clientWdith,
			height: documen.documentElement.clientHeight
		};
	}
}
```
检查compatMode属性确定浏览器是否运行在混杂模式。

#### 滚动大小
像<html>元素不需要执行任何代码也能添加滚动条，但另外一些元素需要通过css的overflow属性进行设置才能滚动
- scrollHeight: 在没有滚动的情况下，元素内容的总高度
- scrollWdith: 在没有滚动的情况下，元素内容的总宽度
- scrollLeft: 被隐藏在内容区域左侧的像素数。通过该属性改变元素滚动位置
- scrollTop: 被隐藏在内容区域上方的像素数。
- document.documentElement.scrollHeight: 带有垂直滚动条的页面总高度

##### 确定文档总高度
```
var docHeight = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
//对于IE，还需要将 documentElement替换成body
```
##### 确定元素大小
```
function getBoundingClientRect(element) {
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;

	if(element.getBoundingClientRect){	
		if (typeof arguments.callee.offset != "number") {
			var temp = document.createElement("div");
			temp.style.cssText = "position:absolute;left:0;top:0";
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;

		return {
			left: rect.left + offset,
			right: rect.right + offset,
			top: rect.top + offset,
			bottom: rect.bottom + offset
		};
	} else {
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);

		return {
			left: actualLeft - scrollLeft,
			right: actualLeft + element.offsetWidth - scrollLeft,
			top: actualTop - scrollTop,
			bottom: actualTop + element.offsetHeight - scrollTop
		};
	}
}

var div = document.querySelector("div");
var demo = getBoundingClientRect(div);
console.log(demo.left);
console.log(demo.right);
console.log(demo.top);
console.log(demo.bottom);
console.log(div.offsetWidth);
console.log(div.offsetHeight);
```
## 遍历
DOM树采用的是深度优先（depth-first)遍历操作。

