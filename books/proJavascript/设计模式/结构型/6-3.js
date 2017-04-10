var  FormField = function(type, displayText){
	this.type = type || "text";
	this.displayText = displayText || "";
}

FormField.prototype = {
	createElement: function(){
		this.element = document.createElement("input");
		this.element.setAttribute("type", this.type);
		this.element.setAttribute("placeholder", this.displayText);
		return this.element;
	},

	isVaild: function(){
		return this.element.value !== '';
	}
};


//表单域装饰者，实现了与FormField相同的公共方法
var FormFieldDecorator = function(formfield){
	this.formfield = formfield;
};

FormFieldDecorator.prototype = {
	createElement: function(){
		this.formfield.createElement();
	},
	isVaild: function(){
		return this.formfield.isVaild();
	}
};

var MaxLengthFieldDecorator = function(formfield, maxLength){
	FormFieldDecorator.call(this, formfield);
	this.maxLength = maxLength || 100;
};

MaxLengthFieldDecorator.prototype = new FormFieldDecorator();
MaxLengthFieldDecorator.prototype.createElement = function(){
	var element = this.formfield.createElement();
	element.setAttribute("maxLength", this.maxLength);
	return element;
};

var AutoCompleteFieldDecorator = function(formfield, autocomplete){
	FormFieldDecorator.call(this, formfield);
	this.autocomplete = autocomplete || "on";
};

AutoCompleteFieldDecorator.prototype = new FormFieldDecorator();
AutoCompleteFieldDecorator.prototype.createElement = function(){
	var element = this.formfield.createElement();
	element.setAttribute("autocomplete", this.autocomplete);
	return element;
};


