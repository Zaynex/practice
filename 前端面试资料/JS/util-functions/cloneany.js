/**
 * deep clone
 * 
 */


function cloneAny(str) {
    var newStr;
    if(isString(str) || isNumber(str)) {
        newStr = str;
    }
    
    if(isUndefined(str) || isNull(str)){
        throw new Error('')
    }
    
    return newStr;
}

// function clone(obj){
//     if(!isObject(obj)) return obj;
//     return isArray(obj)? obj.slice() : 
// }
var toString = Object.prototype.toString;
function isType(type){
    return function(obj) {
        return toString.call(obj) === '[object ' +  type + ']';
    }
}

function isString(obj){
    return typeof obj === 'string';
}

function isNumber(obj){
    return typeof obj === 'number';
}

function isUndefined(obj){
    return typeof obj === 'undefined';
}

function isNull(obj){
    return typeof obj === 'null';
}

function isDate(obj){
    return isType('Date');
}

function isRegExp(obj){
    return isType('RegExp');
}

function isObject(obj){
    // return isType('Object');
    // 如果是函数对象或者是普通的object，并且不为null
    return typeof obj === 'object' || typeof obj === 'function' && !!object;
}

function isFunction(obj){
    return isType('Function');
}

function isArray(obj){
    return isType('Array');
}

function isError(obj){
    return isType('Error');
}

function isBoolean(obj){
    return isType('Boolean');
}




/**
 * cloneFuntions
 */

const reFlags = /\w*$/i;

// RegExp 的每个实例都有下列属性
/**
 * lastIndex: 表示开始搜索下一个匹配的字符位置，从0算起
 * source: 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回
 * 在 ES5 之前所有使用字面量表示的正则表达式都是共享一个RegExp实例的。
 * 目前在 lodash 中是没有把  标志带上的
 */
function cloneRegExp(regexp) {
    const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
    result.lastIndex = regexp.lastIndex
    return result
}

var a = /^d$/;
var b = cloneRegExp(a);
console.log(b);
console.log(b === a);
console.log(a.source);


// 就是新建一个相同类型的构造函数
function cloneBool(bool) {
    return new bool.constructor(+bool)
}

function cloneDate(date) {
    return new date.constructor(+date)
}

function cloneNumber(num) {
    return new num.constructor(num)
}

function cloneString(str) {
    return new str.constructor(str)
}

const hasOwnProperty = Object.prototype.hasOwnProperty


/**
 * 仅支持RegExp#exec返回的数组结果
 */
function cloneArray(array) {
    const length = array.length
    // 如果只是传入一个数字表示创建该长度的数组
    const result = new array.constructor(length)

    if(length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index
        result.input = array.input
    }
    return result
}
const objectproto = Object.prototype


// isPropertype 辅助函数判断传入的对象是否为原型对象
function isPropertype(value) {
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto
    return value === proto
}

function initCloneObj(object) {
    return (typeof object.constructor === 'function' && !isPropertype(object)) ?
        Object.create(Object.getPrototypeOf(object))
        : {}
}
