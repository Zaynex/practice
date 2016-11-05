function FormField(type, displayText){
	this.type = type || "text";
	this.displayText = displayText || "";

	this.element = document.createElement("input");
	this.element.setAttribute("type", this.type);

	this.label = document.createElement("label");
	this.label.innerHTML = this.displayText;

	document.body.appendChild(this.label);
	document.body.appendChild(this.element);
}

FormField.prototype = {
	getValue: function(){
		return this.element.value;
	},

	setValue: function(){
		this.element.value = value;
	},

	isValid: function(){
		var isValid = false,
			value;

		if(this.type === 'text'){
			isValid = this.getValue() !== '';
		}else if(this.type === 'email'){
			value = this.getValue();
			isValid = value !== "" && value.indexOf("@") > 0 && vlaue.indexOf(".", value.indexOf("@"))>>0;
		}else if(this.type === 'number'){
			value =this.getValue();
			isValid = !isNaN(parseInt(value, 10));
		}else {
			//..后面还有很多，因为type类型有24种......
		}
		return isValid;
	}
};

//这种方式可以采用策略模式进行改写