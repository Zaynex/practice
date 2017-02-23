const mixin = function(obj, mixins) {
	const newObj = obj;
	// 把 传入的对象的原型赋值给新的对象
	// newObj.prototype = Object.create(obj.prototype);

	for(let prop in mixins) {
		//遍历自身可枚举的属性，将其赋值给newObj的原型
		//核心就是拓展对象的属性，类似于Object.assign()
		if(mixins.hasOwnProperty(prop)) {
			newObj.prototype[prop] = mixins[prop]
		}
	}
	return newObj;
}

const BigMixin = {
	fly: () => {
		console.log('I can fly')
	}
}

const Big = function(){
	console.log('new big')
}

// 拓展传入的对象的属性
const FlyBig = mixin(Big, BigMixin);
const flybig = new FlyBig();
flybig.fly();