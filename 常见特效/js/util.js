//                   重新开始百度ife task2015 spring

function isArray(array){
	isArray = function(){
		//检测并且赋值，下一次直接调用函数，喵
		if(typeof Array.isArray === 'function'){
			return Array.isArray;
		}else {
			return function(arr) {
				//取得对象的一个内部属性[[Class]]
				return Object.prototype.toString.call(arr) === '[object Array]';
			}
		}
	}();
	return isArray(array);
}

// console.log(isArray([12,3,445]));//true
// console.log(isArray('aaa'));//false

/*
是否为function，typeof检测本身就是小写字符
 */
function  isFunction(fn){
	return (typeof fn) === 'function';
}
// console.log(isFunction(111));
// console.log(isFunction(function(){}));

/*
是否为一个对象，typeof null 也是对象，要清除
null只是一个关键字（null 是一个字面量（而不是全局对象的一个属性，undefined 是））
 */
function isObject(obj){
	if(obj !== null){
		return (typeof obj) === 'object';
	}else{
		return false;
	}
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj){
	if(typeof(obj) != 'object'|| obj === null) {
		return obj;
	}
	//判断是数组还是对象
	var o = Object.prototype.toString.call(obj) === '[object Array]' ? []:{};
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			//如果对象中的属性是一个对象，递归遍历它
			o[i] = typeof obj[i] === 'object' ? cloneObject(obj[i]) : obj[i];
		}
	}
	return o;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
	var result = [];
	for(var i in arr){
		if(result.indexOf(arr[i]) === -1){
			result.push(arr[i]);
		}
	}
	return result;
}

function trim(str){
	return str.replace(/^\s*|\s*$/g,'');//匹配不含空格的所有字符
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// // 其中fn函数可以接受两个参数：item和index
function each(arr, fn){
	for(var i = 0; i < arr.length; i++){
		fn(arr[i], i);
	}
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var total = 0;
	for(var prop in obj){
		if(obj.hasOwnProperty(prop)) {
			total++;
		}
	}
	return total;
}

var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

function isEmail(emailStr){
	var re = /^\w+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/g;
	return re.test(emailStr);
}
console.log(isEmail("238293@qq.com"));

function isMobilePhone(phone){
	var re = /^1[3|4|5|8][0-9]\d{8}$/g;
	return re.test(phone);
}
// console.log(isMobilePhone("13750899284"));

function addClass(element, newClassName){
	return element.className === ""? element.className = newClassName: element += " " + newClassName;
}

function hasClass(element, testClassName){
	if(element.classList){
		return element.classList.contains(testClassName);
	}else {
		var oldClassName = element.className;
		var regex = new RegExp("\\b" + testClassName + "\\b", "g");// \b表示单词边界
		return regex.test(oldClassName);
	}
}


// 移除element中的样式oldClassName
function removeClassName(element, oldClassName){
	if(element.classList){
		element.classList.remove(oldClassName);
	}else {
		// var classNames = element.className.split(/\s+/);//切分成数组
		// var len = classNames.length;
		// for(var i = 0; i < len; i++){
		// 	if(oldClassName.indexOf(len[i]) > -1) {
		// 		classNames.splice(i, 1);
		// 	}
		// }
		// element.className = classNames.join(" ");
		var classNames =element.className;
		var re = new RegExp("\\b" + oldClassName + "\\b*", "g");
		if(re.test(oldClassName)){
			element.className = classNames.replace(re, "");
		}
	}
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode){
	var parNode1 = element.parentNode,
		parNode2 = isSiblingNode.parentNode;
	return parNode1 === parNode2;
}


//dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element){
	var res = {x:0, y:0};
	var temp = element;
	while(temp.offsetParent !== null && temp.offsetParent !== document.body){
		res.x += temp.offsetLeft;
		res.y += temp.offsetTop;
		temp = temp.offsetParent;
	}
	res.x += temp.offsetLeft;
	res.y += temp.offsetTop;
	return res;
}



function getElementsByClassName(oParent, oClass){
	var arr = [];
	if(oParent.getElementsByClassName){
		arr = oParent.getElementsByClassName(oClass);
	}else {
		var aElem = oParent.getElementsByTagName("*");
		for(var i = 0; i < aElem.length; i++) {
			if(hasClass(aElem[i], oClass)){
				arr.push(aElem[i]);
			}
		}
	}
	return arr;
}


//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下
function $ (selector,context) {
    if(typeof selector !=="string")
        return null;
    selector=trim(selector);
    if(typeof document.querySelector ==="function")
        return document.querySelector(selector);// querySelector查询属性选择器是，属性值要用引号/双引号包裹着
    context=context||document;
    var reqExpr=/^([^\s]+)\s*/;
    var matchs=reqExpr.exec(selector);
    var selItem=(matchs&&matchs.length>0)?matchs[1]:"";
    if(selItem === "")
        return null;
    var temp=null;
    if(selItem[0]==="#"){
        // 还要判断是否包含级联
        temp=document.getElementById(selItem.substring(1));
    }else if(selItem[0]==="."){
        var selCssName=selItem.substring(1);
        var temp=getElementsByClassName(context,selCssName);
        if(temp&&temp.length>0){
            temp=temp[0];
        }
    }else if(selItem[0]==="["){
        temp=null;
        var attrSel=selItem.substring(1,selItem.length-1).split("=");
        var key=attrSel[0];
        var val=attrSel.length>1?attrSel[1]:"";
        var childs=context.getElementsByTagName("*");
        for (var i = 0,len=childs.length; i < len; i++) {
            var attr=childs[i].getAttribute(key);
            if(!attr)
                continue;
            !val ? (temp=childs[i]) : (val===attr ? (temp=childs[i]) : void 0);
            if(!temp)
                continue;
            else
                break;
        }
    }else{
        temp=context.getElementsByTagName(selItem)[0];
    }

    if(!temp) 
        return null;
    var nexSel=selector.replace(reqExpr,"");
    if(!nexSel)
        return temp;
    else{
        temp=$(selector.replace(reqExpr,""),temp);
        return temp;
    }
}
var $$ = function (tagName, oParent) {return (oParent || document).getElementsByTagName(tagName);};

function getAttr(oParent, oAttrName){
	var elem = oParent.getElementsByTagName("*");
	var attrT = [],
		N = elem.length;
	for(var i = 0; i < N; i++) {
		if(elem[i].attributes.length > 0 ) {
			for(var j = 0; j < elem[i].attributes.length; j++) {
				if(elem[i].attributes[j].name === oAttrName){
					attrT.push(elem[i]);
				}
			}
		}
	}
	return attrT;
}


function getAttribute(oParent, oAttrName, oAttrValue){
	var elem = oParent.getElementsByTagName("*");
	var attrT = [];
	for(var i = 0; i < elem.length; i++) {
		if(elem[i].attributes.length > 0) {
			for(var j = 0; j < elem[i].attributes.length; j++){
				if(elem[i].attributes[j].name === oAttrName){
					if(elem[i].getAttribute(oAttrName) === oAttrValue){
						attrT.push(elem[i]);
					}
				}
			}
		}
	}
	return attrT;
}

// function $(selector) {
//     var sTr = selector;
//     if (sTr.search(/\s+/g) == -1) {
//         var firstChart = sTr.charAt(0);
//         switch (firstChart)
//         {
//             case "#":
//                 var newStr = sTr.replace(firstChart, "");
//                 return document.getElementById(newStr);
//             break;

//             case ".":
//                 var newStr = sTr.replace(firstChart, "");
//                 return getClass(document, newStr)[0];
//             break;

//             case "[":
//                 console.log(sTr.search(/=/g))
//                 if (sTr.search(/=/g) == -1) {
//                     var reg = /^\[|\]$/g;//开头结尾的符号[];
//                     var newStr = sTr.replace(reg, "");
//                     return getAttr(document, newStr)[0];
//                 } else {
//                     var reg = /^\[|\]$/g;//开头结尾的符号[];
//                     var newStr = sTr.replace(reg, "");
//                     console.log(newStr)
//                     var arrStr = newStr.split("=");
//                     console.log(arrStr)
//                     var oAttrName = arrStr[0];
//                     var oAttrValue = arrStr[1];
//                     return getAttrValue(document, oAttrName, oAttrValue)[0];
//                 }
//             break;

//             default:
//                 return document.getElementsByTagName(sTr)[0];
//         }
//     } else {
//         var partArr = sTr.split(" ");
//         var sParent = partArr[0].replace(partArr[0].charAt(0), "");
//         if (partArr[1].charAt(0) == ".") {
//             var sSon = partArr[1].replace(partArr[1].charAt(0), "");
//         } else {
//             var sSon = partArr[1];
//         }

//         var oParent = document.getElementById(sParent);
//         if (partArr[1].charAt(0) == ".") {
//             return getClass(oParent, sSon)[0];
//         } else {
//             return oParent.getElementsByTagName(sSon)[0];
//         }
//     }
// }


function addEvent(element, event, listener){
	if(element.addEventListener){
		addEvent = function(element, event, listener){
			element.addEventListener(event, listener, false);
		};

	}else if(element.attachEvent){
		addEvent = function(element, event, listener){
			element.attachEvent("on" + event, listener);
		};

	}else {
		addEvent = function(element, event, listener){
			element["on" + event] = listener;
		};
	}
	return addEvent(element, event, listener);
}

function removeEvent(element, event, listener){
	if(listener){
		if(element.removeEventListener){
			element.removeEventListener(event, listener, false);
		}else if(element.detachEvent){
			element.detachEvent(event, listener);
		}else {
			element["on" + event] = null;
		}
	}else {
		return;
	}
}

function addClickEvent(element, listener){
	addEvent(element, "click", listener);
}

function getTarget(event){
	return event.target || event.srcElement;
}

function getEvent(event){
	return event ? event : window.event;
}

function addEnterEvent(element, listener){
	addEvent(element, "keydown", function(event){
		event = getTarget(event);
		if(event.keyCode === 13){
			listener();
		}
	});
}


$.on = function(selector, event, listener){
	var element;
	if(!element) return;
	if(typeof selector === 'string'){
		element = $(selector);
	}else if(typeof selector === 'object'){
		element = selector;
	}
	addEvent(element, event, listener);
};


$.click = function(selector, listener){
	var element;
	if(!selector) return;
	if(typeof selector === 'string'){
		element = $(element);
	}else if(typeof selector === 'object'){
		element = selector;
	}
	addClickEvent(element, listener);
};

$.un = function(selector, event, listener){
	var element;
	if(!selector) return;
	if(typeof selector === 'string'){
		element = $(selector);
	}else if(typeof selector === 'object'){
		element = selector;
	}
	removeEvent(element, event, listener);
};

$.enter = function(selector, listener){
	var element;
	if(!selector) return;
	if(typeof selector === 'string'){
		element = $(selector);
	}else if(typeof selector === 'object'){
		element = selector;
	}
	addEnterEvent(element, listener);
}



function getSelectorType (selector) {
    var res={
        idSelector:0,
        classSelector:0,
        attrSelector:0,
        tagSelector:0
    };
    trim(selector);
    if(selector[0]==="#"){
        res.idSelector=1;
    }else if(selector[0]==="."){
        res.classSelector=1;
    }else if(selector[0]==="["){
        res.attrSelector=1;
    }else{
        res.tagSelector=1;
    }
    return res;
}
function delegateEvent(element, tag, eventName, listener) {
    element=element||document.body;
    $.on(element,eventName,function (e) {
        e=e||window.event;
        var target=e.target||e.srcElement;
        var filters=tag.split(" ");//要考虑多个选择器时怎么办
        for(var i=filters.length-1;i>=0;i--){
            var temp=filters[i].replace(/[#\.\[\]]/g,"");
            var selectorType=getSelectorType(filters[i]);
            if(selectorType.tagSelector===1){
                if(target.nodeName.toLowerCase()!==temp.toLowerCase()){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.idSelector===1){
                if(target.getAttribute("id")!==temp){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.classSelector===1){
                if(!hasClass(target, temp)){
                    return;
                }
                // if(target.getAttribute("className")!==temp){
                //     return;
                // }
                listener.call(target,e);
            }else if(selectorType.attrSelector===1){
                temp=temp.split("=");
                var key=temp[0],
                    val=temp.length>1?temp[1]:"";
                if(val&&val===target.getAttribute(key)){
                    listener.call(target,e);
                }else if(!val&&target.getAttribute(key)){
                    listener.call(target,e);
                }
                return;
            }
        }
    });
}
$.delegate = delegateEvent;


function isIE(){
	var userAgent = navigator.userAgent;
	if(/MSIE([^;]+)/.test(userAgent)){
		return RegExp["$1"];
	}else{
		return -1;
	}
}

// 设置cookie
// function setCookie(cookieName, cookieValue, expiredays) {
//     // your implement
// }
function setCookie(cookieName, cookieValue, expiredays){
	var res = "";
	if(!cookieName || !cookieValue) return;
	res += encodeURIComponent(cookieName) + encodeURIComponent(cookieValue);
	if(expire instanceof Date){
		res += "; expires=" + expiredays.toGMTString();
	}
	document.cookie = res;
}

// 获取cookie值
// function getCookie(cookieName) {
//     // your implement
// }

function getCookie(name){
	var cookieName = encodeURIComponent(name) + "=",
		cookieStart = document.cookie.indexOf(cookieName),
		cookieValue = null;

	if(cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(";", cookieStart);
		if(cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeRUIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

function ajax(url, options){
	if(typeof url !== "string") return;
	if(!ajax.getXHR){
		ajax.getXHR = function(){
			if(window.XMLHttpRequset){
				return function(){
					return new XMLHttpRequset();
				}
			}else if(window.ActiveXObject){
				return function(){
					return new ActiveXObject("Microsoft.XMLHttp");
				}
			}else {
				return function(){
					console.log("你的浏览器不支持ajax");
					return null;
				}
			}
		}();
	}

	var xhr = ajax.getXHR();
	if(!xhr) return;

	var defOpts = {
		type: 'get',
		data: null,
		onsuccess: function(){},
		onfail: function(){}
	};

	for(var prop in defOpts) {
		if(prop.hasOwnProperty(prop)){
			if(typeof options[prop] === 'undefined') {
				options[prop] = defOpts[prop];
			}
		}
	}

	// 数据处理
	var encode = function(uploadData){
		if(typeof uploadData === 'string'){
			return uploadData;
		}
		var res = [];
		for(var prop in uploadData){
			var temp = encodeURIComponent(prop) + "=" + encodeURIComponent(uploadData[prop]);
			res.push(temp);
		}
		return res.join("&");
	}

	if(options.data){
		options.data = encode(options.data);
	}

	var get = function(){
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status === 200 || xhr.status == 304){
					options.onsuccess(xhr.responseText);
				}else {
					options.onfail();
				}
			}
		};

		xhr.open("get", options.data?(url+='?' + options.data):url);
		xhr.send(null);
	}

	var post = function(){
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status==200 || xhr.status==304){
					options.onsuccess(xhr.responseText);
				}else {
					options.onfail(xhr);
				}
			}
		}
		xhr.open("post", url);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(options.data);
	};

	if(options.type === 'get'){
		get();
	}else if(options.type === 'post'){
		post();
	}
}

// 扩展对象
function extend(oldObj, tarObj){
	var res = cloneObject(tarObj);
	for(var prop in oldObj){
		if(oldObj.hasOwnProperty(prop)){
			if(typeof tarObj[prop] === 'undefined') {
				res[prop] = oldObj[prop];
			}
		}
	}
	return res;
}