/*
原型继承，Object.create
Object.create(obj1, obj2)
obj1表示将要继承的原型， obj2可选，表示对对象的属性进一步描述。
 */
function inherit(p) {
	if(p == null) throw TypeError

	if(Object.create) {
		return Object.create(p)
	}

	var t = typeof p;
	if(t !== 'object' && t !== 'function') throw TypeError;
	function F(){};
	F.prototype = p;
	return new F();
}

//创建一个没有任何属性（包括原型继承的属性）的对象
var o1 = Object.create(null);
/*
复制属性的所有特性，除非在目标对象上存在同名属性
 */
Object.defineProperty(Object.prototype,
	"extend", {
		writable: true,
		enumberable: false,
		configurable: true,
		value: function(o) {
			var names = Object.getOwnPropertyNames(o);
			for(var i = 0; i < names.length; i++) {
				if(names[i] in this) continue;
				var desc = Object.getOwnPropertyDescriptor(o, names[i]);
				Object.defineProperty(this, names[i], desc);
			}
		}
	});

// 检测类的属性
function classof(o) {
	if( o === null) return 'Null';
	if( o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}


//返回在a数组中出现x的所有索引
function findAll(a,x ) {
	var results = [],
		len = a.length,
		pos = 0;

	while( pos < len ) {
		pos = a.indexOf(x, pos)
		if(pos === -1) break;
		results.push(pos);
		pos = pos + 1;
	}
	return results
}

isArray = Function.isArray || function(o) {
	return typeof o === 'object' && Object.prototype.toString().call(o) === "[object Array]";
}

function isArrayLike(o) {
	if(o && typeof o === 'object' && ifFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296)
		return true;
	else 
		return false;
}