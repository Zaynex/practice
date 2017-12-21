var DragDrop = function(){
	var dragdrop = new EventTarget(),
		dragging = null,
		diffX = 0,
		diffY = 0;


	function handlerEvent(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable") > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					dragdrop.fire({type:"dragstart", target:dragging, x:event.clientX, y:event.clientY});
				}
				break;
			case "mousemove":
				if(dragging !== null) {
					dragging.style.left = (event.clientX-diffX) + "px";
					dragging.style.top = (event.clientY-diffY) + "px";
					dragdrop.fire({type:"drag", target:dragging, x:event.clientX, y:event.clientY});
				}
				break;
			case "mouseup":
				dragdrop.fire({type:"dragend", target:dragging, x:event.clientX, y:event.clientY});
				dragging = null;
				break;
		}
	};
	dragdrop.enable = function(){
		EventUtil.addHandler(document, "mousedown", handlerEvent);
		EventUtil.addHandler(document, "mouseup", handlerEvent);
		EventUtil.addHandler(document, "mousemove", handlerEvent);
	},
	dragdrop.disable = function(){
		EventUtil.removeHandler(document, "mousedown", handlerEvent);
		EventUtil.removeHandler(document, "mouseup", handlerEvent);
		EventUtil.removeHandler(document, "mousemove", handlerEvent);
	}

	return dragdrop;
}();
DragDrop.enable();

DragDrop.addHandler("dragstart", function(event){
	var status = document.getElementById("status");
	status.innerHTML = "start dragging" + event.target.id;
});

DragDrop.addHandler("drag", function(event){
	var status = document.getElementById("status");
	status.innerHTML += "<br /> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});

DragDrop.addHandler("dragend", function(event){
	var status = document.getElementById("status");
	status.innerHTML += "<br />Draged " + event.target.id + " at (" + event.x + "," + event.y + ")";
});














/*
var DragDrop = function(){
	var dragging = null;
		diffX = 0;
		diffY = 0;
	function handlerEvent(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("draggable") > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
				}
				break;
			case "mousemove":
				if(dragging !== null) {
					dragging.style.left = (event.clientX-diffX) + "px";
					dragging.style.top = (event.clientY-diffY) + "px";
				}
				break;
			case "mouseup":
				dragging = null;
				break;
		}
	};
	return {
		enable: function(){
			EventUtil.addHandler(document, "mousedown", handlerEvent);
			EventUtil.addHandler(document, "mouseup", handlerEvent);
			EventUtil.addHandler(document, "mousemove", handlerEvent);
		},
		disable: function(){
			EventUtil.removeHandler(document, "mousedown", handlerEvent);
			EventUtil.removeHandler(document, "mouseup", handlerEvent);
			EventUtil.removeHandler(document, "mousemove", handlerEvent);
		}
	};
}();

DragDrop.enable();

*/