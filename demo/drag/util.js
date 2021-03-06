

var EventUtil = {
	addHandler : function(element, type, hander) {
		if (element.addEventListener) {
			element.addEventListener(type, hander, false);
		} else if (element.attachEvent) {
			element.attachEvent(type, hander);
		} else {
			element["on" + type] = hander;
		}
	},

	removeHandler: function(element, type, hander) {
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
};


