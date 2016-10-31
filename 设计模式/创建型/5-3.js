
//定义一个基础工厂类,其他更明确的表单域创建工厂类将继承于此类

function FormFieldFactory() {
	this.availableTypes = {
		TEXT: "text",
		EMAIL: "email",
		BUTTON: "button"
	};
};

FormFieldFactory.prototype = {
	makeField: function(){
	//因为该方法被各子类利用多态性重写，因此此方法不应该在此父类中直接调用，如果出现这种情况就抛出错误
		throw new Error("This method should not be called directly");
	}
};

//我们定义HTML5的表单域类
function Html5FormFieldFactory() {}
//Html5继承FormFieldFactory（包括父类的实例和原型链上的属性）
Html5FormFieldFactory.prototype = new FormFieldFactory();


Html5FormFieldFactory.prototype.makeField = function(options){
	var options = options || {},
	type = options.type || this.availableTypes.TEXT,
	displayText = options.displayText || "",
	field;
	switch(type) {
			case this.availableTypes.TEXT:
				field = new Html5TextField(displayText);
				break;
			case this.availableTypes.EMAIL:
				field = new Html5EmailField(displayText);
				break;
			case this.availableTypes.BUTTON:
				field = new ButtonField(displayText);
				break;
			default:
				throw new Error("Invalid filed type specified:" + type);
				break;
		}
	return field;
};

//定义一个工厂类，创建HTML4表单域
function Html4FormFieldFactory() {}
Html4FormFieldFactory.prototype = new FormFieldFactory();

Html4FormFieldFactory.prototype.makeField = function(options){
	var options = options || {};
	type = options.type || this.availableTypes.TEXT;
	field;

	switch(type) {
			case this.availableTypes.TEXT:
			case this.availableTypes.EMAIL:
				field = new Html4TextField(displayText);
				break;
			case this.availableTypes.BUTTON:
				field = new ButtonField(displayText);
				break;
			default:
				throw new Error("Invalid filed type specified:" + type);
				break;
	}

	return field;
};


function Html5TextField(displayText) {
	this.displayText = displayText || "";
}
Html5TextField.prototype.getElement = function(){
	var textField = document.createElement("input");
	textField.setAttribute("type", "text");
	textField.setAttribute("placeholder", this.displayText);

	return textField;
}

function Html4TextField(displayText) {
	this.displayText = displayText || "";
}
//Html4表单不支持placeholder
Html4TextField.prototype.getElement = function(){
	var wrapper = document.createElement("div"),
		textField = document.createElement("input"),
		textFieldId = "text-field-" + Math.floor(Math.random()*999),
		label = document.createElement("label"),
		labelText = document.createTextNode(this.displayText);

	textField.setAttribute("type", "text");
	textField.setAttribute("id", textField);

	label.setAttribute("for", textFieldId);
	label.appendChild(textField);
	wrapper.appendChild(textField);
	wrapper.appendChild(label);
	return wrapper; 
};

function Html5EmailField(displayText){
	this.displayText = displayText || "";
}

Html5EmailField.prototype.getElement = function(){
	var emailField = document.createElement("input");
	emailField.setAttribute("type", "email");
	emailField.setAttribute("placeholder", this.displayText);

	return emailField;
};


function ButtonField(displayText) {
    this.displayText = displayText;
}
ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;

    return button;
};