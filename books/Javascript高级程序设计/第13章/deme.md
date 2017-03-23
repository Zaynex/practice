## 事件
###　DOM0级事件处理程序
```
var btn = document.getElementById("div");
btn.onclick = function(){
	//code
}
```
<!--more-->
### DOM2级事件处理程序
好处是可以添加多个事件，false表示冒泡阶段触发
```
var btn= document.getElementById('button');
btn.addEventListener("click", function(){
	alert("hello!");
}, false);
btn.addEventListener("click", function(){
	alert("world");
});
```
### 移除事件
```
	<div id="myDiv">
		<input type="button" id="myBtn" value="click me ">
	</div>
		<script>
		var btn = document.getElementById('myBtn');
		btn.onclick = function  (argument) {
      		//先执行某些操作
			btn.onclick =null; // 手工移除
			document.getElementById('myDiv').innerHTML = "Processing";
		}
			//传统的做法是为了避免双击，将单个按钮移除并替换成了一条消息，但问题在于当按钮从页面中移除时，依然带有事件处理程序。在<div>设置 innerHTML 可以把按钮移走，但事件处理程序仍然与按钮保持引用关系。因此建议手工删除
	</script>
```

对于DOM2级需要使用
```
var btn = document.getElementById('myBtn');
var handler = function(){
	alert("hello");
};
btn.removeEventListner("click",handler,false);
```
这里添加handler参数时因为删除事件必须要与添加事件的处理程序一致。

### IE处理程序
```
var btn = document.getElementById('button');

btn.attachEvent("onclick", function(){
	alert(this === window); //true
});
var handler = function () {
	alert("hi");
}
btn.attachEvent("onclick", handler)

//删除事件
btn.detachEvent("onclick", handler);
```
事件会反向执行，先输出 hi， 再输出 true；(IE9已修复)

### 跨浏览器事件处理程序
```
var EventUtil = {
	addHandler: function  (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attchEvent) {
			element.attchEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}
```

## 事件对象
```
var btn = document.getElementById('id');
btn.onclick =function  (event) {
	alert(event.currentTarget === this); // true
	alert(event.target === this); //true;
};
```
currentTarget表示的是其事件处理程序正在处理事件的那个元素（就是代码里写的），Target表示你在实际操作时所触发的目标。在事件处理程序内部，this始终等于currentTarget的值。
由于click 的目标是按钮。三个值是相同的。

如果事件处理程序存在于按钮的父节点中，那么是不相同的。
```
document.body.onclick = function (event) {
	alert(event.currentTarget === document.body); // true;
	alert(event.target === document.getElementById("id")); // true
	alert(this === document.body); /// true
};
```
this 和 currentTarget 都是 document.body。
target是按钮，因为他才是click 的真正目标。

```
var btn = document.getElementById('id');
var handler = function  (event) {
	switch(event.type){
		case "click":
			alert("clicked");
			break;

		case "mouseover":
			event.target.style.backgroundColor = "red";
			break;

		case "mouseout":
			event.target.style.backgroundColor = "";
			break;
	}
};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```
### 取消事件
```
//取消默认事件
event.preventDefault();
//取消事件传播
evenet.stopPropagation();
//IE取消默认事件
window.event.returnValue = false;
//IE取消事件冒泡
window.event.cancelBubble = true;
```
### 跨浏览器事件对象
```
var EventUil = {
	addHander : function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent(type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	removeHander: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type ,handler, false);
		} else if (element.detachEvent) {
			element.detachEvent(type, handler);
		}else {
			element["on" + type] = null;
		}
	},
	
	getEvent:function(event) {
		return event ? event : window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	stopPropagation: function (event) {
		if (event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}
```

### 事件类型
- mouseenter: 在鼠标光标从元素外部首次移动到了元素范围内触发。事件不冒泡，而且移动到后代元素不触发。
- mouseleave: 在位于元素上方的鼠标移动到元素范围外时触发，事件不冒泡，而且在移动光标到后代元素上不会触发。
- mousemove: 在鼠标指针在元素内部移动时重复触发
- mouseout: 在鼠标指针位于一个元素上方，将其移动到另一个元素时触发。（也有可能只是移动到另一个子元素）
- mouseover: 鼠标指针位于一个元素的上方，将其移动到另一个元素时触发。（有可能只是移动到另一个子元素）

#### 客户端坐标位置
```
EventUil.addHander(div, "click", function(){
	event = EventUil.getEvent(event);
	alert("clientX:" + event.clientX + "  clientY:" + event.clientY);
});
```
![image](http://note.youdao.com/yws/res/34268/WEBRESOURCE8acaf78a9877416974e19aa3e57c7b98)
不包括客户端滚动距离，只是客户端可视区到鼠标点击的距离。

#### 页面坐标位置
```
EventUil.addHander(btn, "click", function(){
	event = EventUil.getEvent(event);
	alert("pageX:" + event.pageX + "  pageY:" + event.pageY);
})
```
![image](http://note.youdao.com/yws/res/34266/WEBRESOURCE8c6df7a11d2f8a3859e0bede9e47bbc2)
在没有滚动的情况下，pageX和clientX是相等的。

### 屏幕坐标位置
```
EventUil.addHander(btn, "click", function(){
	event = EventUil.getEvent(event);
	alert("screenX:" + event.screenX + "  screenY:" + event.screenY);
});
```
![image](http://note.youdao.com/yws/res/34270/WEBRESOURCE9b0d4055ae7666983a95c86102c54cb5)

### 鼠标按钮
0表示左键，2表示右键，1表示中间键（非IE）
```
	getButton: function(event) {
		if(document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		}else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}
EventUil.addHander(btn, "mousedown", function(){
	event = EventUil.getEvent(event);
	alert(EventUil.getButton(event));
});
```
### keycode
![image](http://note.youdao.com/yws/res/34272/WEBRESOURCE549fb59c8ce833862b5cc3126a49757f)
![image](http://note.youdao.com/yws/res/34274/WEBRESOURCE8e9065794e6576a1fc515cdc36ca8300)
![image](http://note.youdao.com/yws/res/34276/WEBRESOURCE08ebd4e32d49bd98b88546e0a38e93cb)

## 性能与内存（事件委托）
事件委托利用冒泡事件，只指定一个事件处理程序，可以管理某一类型所有的事件。在DOM树上尽量最高的层次上添加一个事件处理程序
```
	<ul id="mylinks">
		<li id="gosomewhere">GO somewhere</li>
		<li id="dosomething">Do something</li>
		<li id="sayhi">Sayhi</li>
	</ul>
var item1 = document.getElementById("gosomewhere");
var item2 = document.getElementById('dosomething');
var item3 = document.getElementById('sayhi');

EventUil.addHandler(item1, "click", function  (event) {
	location.href = "http://www.worx.com";
});
EventUil.addHandler(item2, "click", function (event){
	document.title = "I changed the document title";
});
EventUil.addHandler(item3, "click", function  (event) {
	alert("hi")
});
// 在一个负责的web应用程序中，对所有可单机的元素都采用该方式，将会造成大量代码
var list = document.getElementById('mylinks');

EventUil.addHandler(list, "click", function  (event) {
	event = EventUil.getEvent(event);
	var target = EventUil.getTarget(event);

	switch(target.id) {
		case "dosomething" :
			document.title = "I changed the document title";
			break;
		case "gosomewhere" :
			location.href = "http://www.worx.com";
			break;
		case "sayhi" :
			alert("hi")
			break;
	}
})		
```