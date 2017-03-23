var EventUtil = {
	addHandler: function  (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attchEvent) {
			element.attchEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	getEvent : function  (event) {
		return event ? event || window.event; //使用dom0 级方法添加事件处理程序，，在IE中event对象会作为window对象的一个属性存在
	},

	getTarget : function  (event) {
		return event.target || event.srcElement;
	},

	preventDefault : function  (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeHandler : function  (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
			}
	},

	stopPropagation: function  (event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}

};

var btn = document.getElementById('id');
btn.onclick =function  (event) {
	alert(event.currentTarget === this); // true
	alert(event.target === this); //true;
};

由于click 的目标是按钮。三个值是相同的。

如果事件处理程序存在于按钮的父节点中，那么是不相同的。

document.body.onclick = function (event) {
	alert(event.currentTarget === document.body); // true;
	alert(event.target === document.getElementById("id")); // true
	alert(this === document.body); /// true
};

this 和 currentTarget 都是 document.body。
target是按钮，因为他才是click 的真正目标 


处理多个事件，可以使用type属性

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



阻止默认事件

var link = document.getElementById("myLink");
link.onclick = function  (event) {
	event.preventDefault();
};


阻止冒泡

var btn = document.getElementById("btn");
btn.onclick = function  (event) {
	alert("ckick");
	event.stopPropagation();
};

document.body.onclick = function  (event) {
	alert("Body clicked");
};

body clicked  不会执行，冒泡阻止




EventUtil.addHandler(window, "load", function(){
	var image = document.createElement("img");
	EventUtil.addHandler(image, "load", function(event){
		event = EventUtil.getEvent(event);
		alert(EventUtil.getTarget(event).src);
	});
	document.body.appendChild(image);
	image.src = "simle.gif";
});

```
