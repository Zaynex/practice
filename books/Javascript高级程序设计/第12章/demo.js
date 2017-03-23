function getBoundingClientRect(element) {
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;

	if(element.getBoundingClientRect){	
		if (typeof arguments.callee.offset != "number") {
			var temp = document.createElement("div");
			temp.style.cssText = "position:absolute;left:0;top:0";
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;

		return {
			left: rect.left + offset,
			right: rect.right + offset,
			top: rect.top + offset,
			bottom: rect.bottom + offset
		};
	} else {
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);

		return {
			left: actualLeft - scrollLeft,
			right: actualLeft + element.offsetWidth - scrollLeft,
			top: actualTop - scrollTop,
			bottom: actualTop + element.offsetHeight - scrollTop
		};
	}
}

var div = document.querySelector("div");
var demo = getBoundingClientRect(div);
console.log(demo.left);
console.log(demo.right);
console.log(demo.top);
console.log(demo.bottom);
console.log(div.offsetWidth);
console.log(div.offsetHeight);