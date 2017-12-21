const _ = {}

const createAssigner = (keyFunc, undefinedOnly) => (obj) => {
  let length = arguments.length
  if (length < 2 || obj == null) return obj
  for (let index = 1; index < length; index++) {
    let source = arguments[index],
      key = keyFunc(source),
      l = keys.length
    for (let i = 0; i < l; i++) {
      let key = keys[o]
      if (!undefinedOnly || obj[key] == void 0) obj[key] = source[key]
    }
  }
  return obj
}

var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
  'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

function collectNonEnumProps (obj, keys) {
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
  var prop = 'constructor';
  if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
      keys.push(prop);
    }
  }
}

_.has = function (obj, key) {
  // hasOwnProperty 自身对象是否存在该属性（非继承）
  // in 会通过原型链去查找继承的属性
  return obj != null && hasOwnProperty.call(obj, key);
};

if (typeof /./ != 'function' && typeof Int8Array != 'object') {
  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}


_.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = _.values(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return _.indexOf(obj, item, fromIndex) >= 0;
};

_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);

const allKeys = (obj) => {
  if (!_.isObject(obj)) return []
  const keys = []
  for (let key in obj) keys.push(key)
  // 遍历可枚举属性（不包含原型链）
  if (hasEnumBug) collectNonEnumProps(obj, keys)
  return keys
}
_.extend = createAssigner(_.allKeys)
_.isObject = (obj) => typeof obj == 'function' || typeof obj == 'object' && typeof obj != null
_.extend({ name: 'moe' }, { age: 50 })
