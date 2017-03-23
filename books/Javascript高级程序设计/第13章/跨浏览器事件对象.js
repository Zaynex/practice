var EventUil = {
	addHander : function(element, type, hander) {
		if (element.addEventListener) {
			element.addEventListener(type, hander, false);
		} else if (element.attachEvent) {
			element.attachEvent(type, hander);
		} else {
			element["on" + type] = hander;
		}
	},

	removeHander: function(element, type, hander) {
		if(element.removeEventListener) {
			element.removeEventListener(type ,hander, false);
		} else if (element.detachEvent) {
			element.detachEvent(type, hander);
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
	},

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
},


var list = document.getElemetById("list");

list.onclick = function(event){
	event = EventUil.getEvent(event);
	var target = EventUil.getTarget(event);
}









var btn =document.getElementById("mybtn");
var hander = function(){
	alert("helloworld");
}
EventUil.addHander(btn, "click", hander);
EventUil.removeHander(btn, "click", hander);

btn.onclick = function(){
	alert(window.event.srcElement === this);
	//事件处理程序的作用域是根据指定它的方式来确定的，所以不能认为this始终等于时间目标。最好还是用srcElement
}
btn.attachEvent("onclick", function(event){
	alert(event.srcElement === false);
});



var link = document.getElementById("link");
link.onclick = function  (event) {
	event = EventUil.getEvent(event);
	EventUil.preventDefault(event);
}
// 以上代码确保所有浏览器点击该链接不会打开另一个页面。
// 1.首先用 EventUil.event 或者对象，再将其传入到 对应的方法中


// 阻止事件流，但IE不支持事件捕获，所以这个方法在跨浏览器下，也只能用来阻止事件冒泡。
btn.onclick = function  (event) {
	alert("clicked");
	event = EventUil.getEvent(event);
	EventUil.stopPropagation(event);
};
document.body.onclick =function  (event) {
	alert("body clicked");
};



EventUil.addHander(window, "load", function(){
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	EventUil.addHander(link, "load", function(event){
		alert("css loaded");
	});

	link.href = "example.css"; 
	document.getElementsByTagName("head")[0].appendChild(link);
});

EventUil.addHander(window, "load", function(){
	var script = document.createElement("script");
	EventUil.addHander(link, "load", function  (event) {
		alert("js loaded");
	})
	script.src = "example.js";
	document.body.appendChild(script);
})



内存与性能

事件委托

事件委托是利用事件冒泡，只指定一个事件处理程序就可以管理某一类型的所有事件



