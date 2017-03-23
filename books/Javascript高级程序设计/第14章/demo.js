var EventUil = {
	addHandler : function(element, type, handler) {
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
var form = document.getElementById('myform');
EventUil.addHandler(form, "submit", function(){
	event = EventUil.getEvent(event);
	target = EventUil.getTarget(event);
	var btn = target.elements["submit-btn"];
	btn.disabled = true;
});

EventUil.addHandler(window, "load", function(){
	var element = document.forms[0].elements[0];
	if(element.autofocus !== true){
		element.focus();
		console.log("JS focus");
	}
});


var textbox = document.forms[0].elements['textbox1'];
alert(textbox.value);
textbox.value = "Some new value";