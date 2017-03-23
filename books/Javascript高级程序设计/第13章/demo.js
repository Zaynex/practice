var btn = document.getElementById('id');
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
	},
	getCharCode: function(event){
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}	
};

EventUil.addHander(btn, "mousedown", function(){
	event = EventUil.getEvent(event);
	alert(EventUil.getButton(event));
});

var text = document.getElementById('myText');
EventUil.addHander(text, "keyup", function(){
	event = EventUil.getEvent(event);
	alert(event.keyCode);
})