/**
 * 实现 Object.assign
 * 拷贝源对象和可枚举的属性到目标对象，因为是浅复制，所以复制的只是一个引用
 * 1. 不复制继承属性和不可枚举的属性
 * 2. 可以复制 Symbol 类型，和 getter 属性
 * 3. 会忽略 null 或者 undefined 的源对象
 * 4. 对于字符的原始类型会被包装为 Object，key 就是 index
 * 5. 如果中途出现异常，之前复制的依然保留，但中断之后的对象不再复制
 */


var obj = {
    foo: 1,
    get bar() {
        return 2;
    }
};

var copy = Object.assign({}, obj);
// { foo: 1, bar: 2 }
// copy.bar的值来自obj.bar的getter函数的返回值 
console.log(copy);
/**
 * rest -> 将之后不定量的参数组成一个数组，
 * 如果是obj，也会组成数组，index 下标
 * 把后面传进来的多个 object 参数组成一个数组
 * 
 */
function completeAssign(target, ...sources) {
    sources.forEach(source => {
        // Object.keys 会返回可枚举的属性
        /**
         * {
         *  value, writable, get, set ,configurable 表示对象是否可以被改变或删除, enumerable
         * }
         */
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
            // 返回属性描述符
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
            return descriptors
        }, {})

        Object.getOwnPropertySymbols(source).forEach(sym => {
            let descriptor = Object.getOwnPropertyDescriptor(source, sym)
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor
            }
        })
        console.log(target,descriptors )
        Object.defineProperties(target, descriptors)
    })
    return target
}
var copy = completeAssign({}, obj)
console.log(copy)


if(typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, thisArgs) {
            if(target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target)

            for(var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[index]

                if(nextSource != null) {
                    for(var nextKey in nextSource) {
                        if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey]
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    })
}