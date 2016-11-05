function FormField(type, displayText, strategy){
	this.type = type || 'text';
	this.displayText = displayText || "";

	this.element = document.createElement("input");
	this.element.setAttribute("type", this.type);
	this.label = document.createElement("label");
	this.label.innerHTML = this.displayText;

	//检查是否含有包含isValid()方法的策略对象传入，如果有，则保存该策略对象，以便在此对象的isVaild()方法上执行时使用。
	//如果没有提供策略对象，则使用默认对象
	
	if(strategy && typeof strategy.isValid === 'function'){
		this.strategy = strategy;
	}else {
		this.strategy = {
			isValid: function(){
				return false;
			}
		};
	}

	document.body.appendChild(this.label);
	document.body.appendChild(this.element);
}

FormField.prototype = {
	getValue : function(){
		return this.element.value;
	},
	setValue: function(){
		this.element.value = value;
	},

	//通过调用所保存的策略对象中提供的isValid方法来替代之前的isValid的方法弥补再需要使用多个
	//if else 语句，使得类的代码更加精简易于维护
	isValid: function(){
		return this.strategy.isValid.call(this);
	}
};

var textFieldStrategy = {
	isValid: function(){
		return this.getValue() !== '';
	},
	emailFieldStrategy = {
		isValid: function(){
			var value = this.getValue();
			return value !== "" && value.indexOf("@") > 0 && value.indexOf(".", value.indexOf("@"))>>0;
		}
	},

	numberFieldStrategy = {
		isValid: function(){
			var value = this.getValue();
			return !isNaN(parseInt(value, 10));
		}
	}
};