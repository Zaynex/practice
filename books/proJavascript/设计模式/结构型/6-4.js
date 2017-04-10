var form = document.createElement("form"),	
	formField = new FormField("search", "Enter your search term");

//使用装饰者为所生成的表单添加maxLength 和 autoComplete 属性。

formField = new MaxLengthFieldDecorator(formField, 255);
formField = new AutoCompleteFieldDecorator(formField, "off");

form.appendChild(formField.createElement());

form.addEventListener("submit", function(e){
	e.preventDefault();

	if(formField.isValid()){
		form.submit();
	}else {
		alert("Please correct the issues in the form field");
	}
}, false);

window.addEventListener('load', function(){
	document.body.appendChild(form);
}, false);