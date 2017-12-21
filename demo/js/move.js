var Animate = function(element, options, callback){
	this.initialize.apply(this, arguments);
};

Animate.prototype = {
	initialize: function(element, options, callback){
		var self = this;
		this.options = options;
		this.element = element;
		this.callback = callback;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			self.doMove();
		}, 30);
	},

	css: function(attr, value){
		if(arguments.length == 1){
			return parseFloat(this.element.currentStyle ? this.element.currentStyle[attr]: getComputedStyle(this.element, null)[attr]);
		}else if(arguments.length === 2){
			attr === "opacity"? (this.element.style.filter = "alpha(opacity=" + value + ")", this.element.style.opacity = value /100): this.element.style[attr] = value + "px";
		}
	},

	doMove: function(){
		var opt = this.options;
		var isComplete = true;
		for(var p in opt){
			var iCur = p == 'opacity' ? parseInt(this.css(p).toFixed(2) * 100) : this.css(p);
			var iSpeed = (opt[p] - iCur) / 5;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			opt[p] == iCur || (isComplete = false, this.css(p, iCur + iSpeed));
		}
		isComplete && (clearInterval(this.timer), this.callback && this.callback.call(this));
	}
};


window.onload = function(){
	var oSpan = $("span");
	var oInput = $('input');
	console.log(oSpan);
	console.log(oInput);
	var aData = [
		{width:20, height:20},
		{width:80, height:80},
		{left:10}, {left:408},
		{opacity:100},
		{opacity:0},
		{opacity:100},
		{width:80, height:80, left:408},
		{top:10},
		{width:20, height:20, left:468},
		{top:70},
		{left:10},
		{top:10},
		{left:468},
		{width:20, height:20, left:468},
		{width:80, height:80, left:408}
	];
	var bOrder = true;
	var i= 0;
	// 在未开始运动时不禁用表单
	oInput.disabled = false;
	addClickEvent(oInput, function(){
		var self = this;
		//点击事件添加后禁用表单防止出现重复运动
		self.disabled = true;
		function begin(){
			bOrder? i++ : i--;
			var obj = new Animate(oSpan, aData[i], begin);
			//用累加的方式记录运动，当运动长度相等时，进行反向调用
			if(i == aData.length || i < 0){
				clearInterval(obj.timer);
				bOrder = !bOrder;
				self.value = bOrder ? "开始" : "原路退回";
				self.disabled = false;
				return;
			}
			console.log(obj);
		}
		begin();
	});

	$.on(oInput, "focus", function(){
		this.blur();
	});
}


// function getStyle(obj, attr){
// 	if(obj.currentStyle){
// 		return obj.currentStyle;
// 	}else{
// 		return getComputedStyle(obj, false)[attr];
// 	}
// }

// function startMove(obj, json, fn){
// 	clearInterval(obj.timer);
// 	obj.timer = setInterval(function(){

// 		var bStop = true; //所有值都达到了

// 		for(var attr in json){
// 			var iCur = 0;
// 			if(attr == 'opacity'){
// 				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
// 			}else{
// 				iCur = parseInt(getStyle(obj, attr));
// 			}

// 			var iSpeed = (json[attr] - iCur)/8;
// 			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
// 			if(iCur != json[attr]){
// 				bStop = false;
// 			}

// 			if(attr == 'opacity'){
// 				obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
// 				obj.style.opacity = (iCur+iSpeed)/100;
// 			}
// 			else{
// 				obj.style[attr]  = iCur + iSpeed +"px";
// 			}
// 		}

// 		if(iCur != json[attr])
// 		{
// 			bStop = false;
// 		}
// 	},30)
// }