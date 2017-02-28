/**
 * 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问
 * 当客户端不方便直接访问一个对象或不满足需求的时候，提供一个替身对象来控制这个对象的访问
 * 保护代理：拒绝一些不必要的请求
 * 虚拟代理：代理选择适当的时机执行，避免每次都产生很大的开销
 */

/**
 * 应用场景一：
 * 图片预加载，先用一张loading图占位，然后异步方式加载图片，加载完后填充到里面
 */


var myImage = (function(){
	var imgNode = document.createElement("img");
	document.body.appendChild(imgNode);

	return {
		setSrc: function(src) {
			imgNode.src = src
		}
	}
})()

var proxyImage = (function(){
	var img = new Image;
	img.onload = function(){
		myImage.setSrc(this.src)
	}
	return {
		setSrc: function(src) {
			myImage.setSrc('../loading.gif')
			img.src = src
		}
	}
})

proxyImage.setSrc('http://girl.jpg')
// 通过代理 proxyImage 间接访问 myImage. 在图片加载完成之后先将img的src设置成loading.gif动画

var MyImage = (function(){
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);
	var img = new Image;

	img.onload = function(){
		imgNode.src = img.src
	}

	return {
		setSrc: function(src){
			imgNode.src = "loading.gif";
			img.src = src;
		}
	}
})()
MyImage.setSrc('girl.jpg');

// 虽然不用代理模式也可以完成图片预加载。
// 但是违背了单一职责原则“就是一个类应该仅有一个引起它变化的原因，如果一个对象承担了多项职责，
// 那么引起它变化的原因就有多个。面向对象鼓励将行为分布到细粒度的对象中。

// 而且如果以后不再用图片预加载，上述代码改动就会很大。
// 但是代理负责预加载，只要不执行代理操作，而只执行本体操作，就可以省去预加载，
 

/**
 * 场景二： 虚拟代理合并http请求
 * 比如说业务中有一些筛选框，选中相应的选项后发送相应的请求
 */
var holdChoices = function(id){
	console.log("你选中了：" + id);
}

var checkbox = document.getElementsByTagName("input");
for(var i = 0, c; c = checkbox[i++]; ){
	c.onclick = function(){
		if(this.checked === true) {
			holdChoices(this.id)
		}
	}
}

// 如果点击三次就发送了三次请求，但频繁的网络请求会给产生很大的开销
/*
 * 解决方案是通过一个代理函数 proxyHoldChoices 来收集一段时间内的请求
 * 最后一次性发送给服务器。比如等待2s后再把2s内所有的请求发送给服务器
 */

var holdChoices = function(id){
	console.log('你选中了：' + id)
}

var proxyHoldChoices = (function(){
	var cache = [],
		timer;
	return function(id)}{
		cache.push(id);
		if(timer){
			return;
		}

		timer = setTimeout(function(){
			holdChoices(cache.join(','));
			clearTimeout(timer);
			timer = null;
			cache.length = 0
		}, 2000)
	}
})()

var checkbox = document.getElementsByTagName("input");
for(var i = 0, c; c = checkbox[i++]; ){
	c.onclick = function(){
		if(this.checked === true) {
			proxyHoldChoices(this.id)
		}
	}
}

/**
 * 缓存代理
 * 比如在计算菲波那切数列里面常用的加一个变量进行缓存
 * 从这里可以看到代理模式是不会影响原有的计算的
 * 在自己的项目中用到了缓存代理来避免多次ajax异步请求相同的数据
 */


var mult = function(){
	console.log('开始计算乘积');
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++){
		a = a * arguments[i];
	}
	return a
}

mult(1, 2, 3, 4);
var proxyMult = function(){
	var cache = {};
	return function(){
		var args = [].join.call(arguments, ",");
		if(args in cache){
			return cache[args];
		}
		return cache[args] = mult.apply(this, arguments);
	}
}();

proxyMult(1,2,3,4);