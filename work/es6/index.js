


// generate
// yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
// function* foo(x) {
//   var y = 2 * (yield (x + 1));
//   var z = yield (y / 3);
//   return (x + y + z);
// }

// var a = foo(5);
// a.next();//第一次next输出的是 6
// a.next(12);//第二次输入的参数是第一个yield参数，所以y = 24， x = 11,返回的是yield (24/3)
// a.next(13);//第三次是 将13设为 z的结果，所以 13+24+11 = 48，也就是最后return 的结果。
//这里注意的是 传入的13 就是 yield(y/3)的结果，照理来说 y = 39，但其实generator并没有再重新计算原来的值，否则x的值也变了，那么原先的结果都错了。

// function wrapper(generatorFunction){
// 	return function(...args){
// 		let generatorObject = generatorFunction(...args);
// 		generatorObject.next();
// 		return generatorObject;
// 	};
// }


// const wrapped = wrapper(function* (){
// 	console.log(`First input:${yield}`);
// 	return 'Done';
// });

// wrapped().next('hello!');


//斐波那契额数列，因为for of 可以遍历循环yield
// function* fibonacci(){
// 	let [prev, curr] = [0,1];
// 	for(;;){
// 		[prev, curr] = [curr, prev + curr];
// 		yield curr;
// 	}
// }

// for(let n of fibonacci()){
// 	if(n > 1000) break;
// 	console.log(n);
// }

//原生的JavaScript对象没有遍历接口，无法使用for...of循环，通过Generator函数为它加上这个接口，就可以用了。
// function* objectEntrites(obj){
// 	let propKeys = Reflect.ownKeys(obj);

// 	for(let propKey of propKeys){
// 		yield [propKey, obj[propKey]];
// 	}
// }

// let jane = {first: 'Jane', last:'Doe'};
// for(let [key, value] of objectEntrites(jane)){
// 	console.log(`${key}: ${value}`);
// }

// 集合可以保存不同类型的数据
// 在向集合添加数据的时候，JavaScript并不进行数据转化。因此2和'2'是不一样的
// 对集合对象来说，所有的NaN都是一样的`


//遍历集合对象最简单的方法就是遍历values()方法的返回值

var sampleSet = new Set([1,2,3,4,5]);
sampleSet.forEach((value, key)=>{console.log(value)});

'use strict';
var sampleMap = new Map();
sampleMap.set('key1', 'value1');
sampleMap.set('key2','value2');
for(let key of sampleMap.keys()){
	console.log(key + '---' + sampleMap.get(key));
}

for(let val of sampleMap.values()){
	console.log(val);
}

for(let item of sampleMap.enteries()){
	console.log(item[0] + '---' + item[1]);
}


