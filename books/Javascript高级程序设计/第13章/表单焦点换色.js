var textbox = document.form[0].elements[0];
EventUil.addHander(textbox, "focus", function(event){
	event = EventUil.getEvent(event);
	var target = EventUil.getTarget(event);

	if(target.style.backgroundColor != "red"){
		target.style.backgroundColor = "yellow";
	}
});

EventUil.addHander(textbox, "blur", function(event){
	event = EventUil.getEvent(event);
	var target = EventUil.getTarget(event);

	if(/[^\d]/.test(target.value)){
		target.style.backgroundColor = "red";
	}else {
		target.style.backgroundColor = "";
	}
});

EventUil.addHander(textbox, "change", function(event){
	event = EventUil.getEvent(event);
	var target = EventUil.getTarget(event);

	if(/[^\d]/.test(target.value)) {
		target.style.backgroundColor = "red";
	}else{
		target.style.backgroundColor = "";
	}
});