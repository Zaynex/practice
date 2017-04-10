//定义个生成器类，构建简单的表单元素
//开发者将实例化该生成器，将各项表单域添加至表单元素，
//调用一个方法来返回一个包含所有添加的表单域的form元素

function FormBuilder(){}
FormBuilder.prototype = {
	fields: [],
	addField: function(type, displayText) {
		var field;

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
				throw new Error("Invalid field type specified: " + type);
		}

		this.fields.push(field);
	},

	getForm: function(){
		var form = document.createElement("form"),
			index = 0,
			numberFields = this.fields.length,
			field;

		for(; index < numberFields; index++) {
			field = this.fields[index];
			form.appendChild(field.getElement());
		}
		
		return form;
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