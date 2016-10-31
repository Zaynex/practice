var isSupportHTML5 = (function(){
	var field = document.createElement("input");
	field.setAttribute("type","email");
	return field.type === "email";
})(),
	formFieldFactory = isSupportHTML5 ? new Html5FormFieldFactory() : new Html4FormFieldFactory(),

	textField = formFieldFactory.makeField({
		type: "text",
		displayText: "Enter the first line of your address"
	}),

	emailField = formFieldFactory.makeField({
		type: "email",
		displayText: "Enter your email"
	}),

	buttonField = formFieldFactory.makeField({
		type:"button",
		displayText: "submit"
	});


window.addEventListener("load", function(){
	var body = document.body;
	body.appendChild(textField.getElement());
	body.appendChild(emailField.getElement());
	body.appendChild(buttonField.getElement());
},false);