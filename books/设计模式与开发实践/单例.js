/*
单例模式： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
通常用于全局缓存，浏览器中的window对象等。

用一个变量标志当前是否已经为某个类创建过对象，如果是则在下一次获取该类的实例时直接返回之前创建过的对象
 */


/*
这种方式的缺点就是需要通过额外的方法去获得
 */
var Singleton = function(name){
	this.name = name;
	this.instance = null;
}

Singleton.prototype.getName = function(){
	console.log(this.name);
}

Singleton.getInstance = function(name){
	if(!this.instance){
		this.instance = new Singleton(name);
	}
	return this.instance
}

// var a = Singleton.getInstance('seven');
// var b = Singleton.getInstance('www');
// console.log(a);
// console.log(b);



// 直接通过new 来进行生成
// 与上面的直接区别就是使用 init了。在原型链上加一个init方法
var CreateDiv = (function(){
	var instance;
	
	var CreateDiv = function(html) {
		if(instance) {
			return instance
		}
		this.html = html;
		this.init();
		return instance = this;
	}

	CreateDiv.prototype.init = function(){
		var div = document.createElement("div");
		div.innerHTML = this.html;
		document.body.appendChild(div);
	}

	return CreateDiv
})();

// var a = new CreateDiv('sven1');
// var b = new CreateDiv('sven2');

//上述方式的缺陷在于 如果需要创建多个节点时就要注释掉 if(instance)这段代码。



/*
采用代理模式实现单例
其中这种方式是将负责管理单例的逻辑搬到了另外一个代理类当中
 */
var CreateDiv = function(html) {
	this.html = html;
	this.init()
}

CreateDiv.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
}

var ProxySingletonCreateDiv = (function(){
	var instance;
	return function(html){
		if(!instance) {
			instance = new CreateDiv(html);
		}
		return instance
	}
})();

// var a = new ProxySingletonCreateDiv('seven0');
// var b = new ProxySingletonCreateDiv('seven1');


/**
 * 惰性单例
 * 总是在调用一些方法的时候才创建，而不是页面加载好才创建，比如之前的Singleton.getInstance
 */


/*
具体的业务场景：比如说当用户点击时出现一个登陆的弹出窗。
 */

var createLoginLayer = function(){
	var div = document.createElement("div");
	div.innerHTML = '我是登录窗口';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
}

document.getElementById("loginBtn").onclick = function(){
	var loginLayer = createLoginLayer();
	loginLayer.style.display = 'block';
}

//之前同花顺有道笔试题我差不多也是这么写的，但有一个问题就是如果用户由于某些操作之后频繁的取消又点击弹窗，那么这段代码又需要多次创建相同的弹窗DOM结构
//还是有所消耗的。下面就可以利用惰性单例进行完善

var createLoginLayer = (function(){
	var div;
	return function(){
		if(!div) {
			div = document.createElement('div');
			div.innerHTML = "我是登录窗口";
			div.style.display = "none";
			document.body.appendChild(div);
		}
		return div
	}
})()

// 这里就多加了一个变量进行缓存/标识，下次创建时直接返回。

//****************************再次优化**************************************
// 遵循单一原则 -> 创建对象和管理单例的逻辑都在一起了。
//如果以后要创建script标签或者iframe都可以采用这种方式。
//我们只需要把不变的部分隔离出来，其实逻辑完全可以抽象成
// var obj;
// if(!obj){
// 	obj === xxx
// }
// 将管理单例的逻辑从原来的代码中抽离出来，封装在getSingle 中，创建方法的fn被当做参数动态传入。

var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this, arguments));
	}
};

var createLoginLayer = function(){
	var div = document.createElement('div');
	div.innerHTML = '我是登录窗口';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
}

var createSingleLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function(){
	var loginLayer = createSingleLayer();
	loginLayer.style.display = 'block';
}
