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