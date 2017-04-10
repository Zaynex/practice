var field = {
	type: "",
	displayText: "",

	getElement: function(){
		var field = document.createElement("input");
		field.setAttribute("type", this.type);
		field.setAttribute("placeholder", this.displayText);
		
		return field;
	}
},

textField = Object.create(field, {
	//也可以加引号"type"
	type: {
		value: "text",
		ennumerable: true
	},

	displayText: {
		value: "Enter your address",
		ennumerable: true
	}
}),

emailField = Object.create(field, {
	"type": {
		value: "email",
		ennumerable: true
	},
	"displayText": {
		value: "email address",
		ennumerable: true
	}
});


window.addEventListener("load", function(){
	var body = document.body;
	body.appendChild(textField.getElement());
	body.appendChild(emailField.getElement());
}, false);
