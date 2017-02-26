/*
函数节流
控制函数发生的时间间隔。在频繁调用时控制其执行周期。

函数去抖
控制函数发生的频率。一般函数去抖的场景是在 用户频繁的操作比如拖拽时，只需要让其触发一次，而不是周期性的触发
 */

var debounce = function(fn, interval) {
	var _self = fn,
	 	timer,
	 	firstTime = true;

	return function(){
		var args = arguments,
			_me = this;
		if(firstTime) {
			_self.apply(_me, args);
			return firstTime = false;
		}

		if(timer) {
			return false
		}

		timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			_self.apply(_me, args);
		}, interval || 500)
	}

}

window.onresize = debounce(function(){
	console.log(1);
})