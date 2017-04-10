//定义一个工厂，使用合适的类创建表单域对象
var FormFieldFactory = {

	
        // The makeField method takes two options:
        // - type, which defines the type of form field object to create, e.g. text, email,
        //    or button
        // - displayText, which defines either the placeholder text for the form field, or the
        //    text to display on the button, depending on the type
	makeField: function(options) {
		var options = options || {},
                type = options.type || "text",
                displayText = options.displayText || "",
                field;
        // Create an object instance using the most appropriate "class" based on the
        // supplied input type
		switch(type) {
			case "text": 
				field = new TextField(displayText);
				break;
			case "email":
				field = new EmailField(displayText);
				break;
			case "button":
				field = new ButtonField(displayText);
				break;
			default:
				field = new TextField(displayText);
				break;
		}

		return field;
	}
};

function TextField(dispalyText) {
	this.dispalyText = dispalyText;
}

TextField.prototype.getElement = function(){
	var textField = document.createElement("input");
	textField.setAttribute("type", "text");
	textField.setAttribute("placeholder", this.dispalyText);

	return textField;
};

function EmailField(dispalyText) {
	this.dispalyText = dispalyText;
}
EmailField.prototype.getElement = function(){
	var emailField = document.createElement("input");
	emailField.setAttribute("type", "email");
	emailField.setAttribute("placeholder", this.dispalyText);
	return emailField;
};

function ButtonField(dispalyText){
	this.dispalyText = dispalyText;
}

ButtonField.prototype.getElement = function(){
	var button = document.createElement("button");
	button.setAttribute("type", "sibmit");
	button.innerHTML = this.dispalyText;

	return button;
};


