function inputSupportType(type) {
	if(!document.getElementById) return false;
	var input = document.getElementById("input");
	input.setAttribute("type", type);
	if(input.type == "text" && type != "text") {
		return false;
	} else {
		return true;
	}
}

// 检测浏览器是否支持某种类型的输入控件


function elementSupportAttribute(elementName, attribute) {
	if (!document.getElementById) return false;
	var temp = document.createElement(elementName);
	return (attribute in test);
}

if( !elementSupportAttribute("input", "placeholder")) {
	//生成占位符脚本
	var input = document.getElementById("input");
	input.onfocus = function(){
		var text = this.placeholder ||  this.getAttribute("placeholder") ;
		if( this.value == text) {
			//重置输入框的值，以隐藏临时的占位符
			this.value = "";
		}
	}
	input.onblur = function(){
		if(thi.value ="") {
			//把输入框的值设置为占位fu
			this.value = this.placeholder || this.getAttribute("placeholder");
		}
	}
	input.onblur();
}


