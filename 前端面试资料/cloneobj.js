function cloneObj(obj){
	if(typeof obj != 'object' || obj === null) return obj;

	var newObj = Object.prototype.string.call(obj) === '[object Array]' ? []:{};
	//使用 hasOwnProperty() 方法，排除继承的属性。
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			newObj[i] = typeof obj[i] === 'object'? cloneObj(obj[i]) : obj[i];
		}
	}
	return newObj;
}

var s = JSON.stringify(obj);
var o = JSON.parse(s);