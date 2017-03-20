[] + {};// "[object object]"
{} + [];// 0
// 在第一处， {} 出现在+运算符中，因此它被当做一个空对象处理， []强制类型转换为"" 而{} 强制类型转换为[object object]
// 第二处，{} 被当做一个独立的空代码块（不执行任何操作），即被当做 +[],是显式强制类型转换 为 0;


/**
 * TDZ 暂存性死区
 * 由于代码中的变量还没有初始化而不能被引用的情况
 */

{
	a = 2;// Reference Error
	let a;
}

function foo(){
	try{
		return 42;
	}
	finally{
		console.log('hello')
	}
}

console.log(foo())
// hello
// 42
// 先将foo()的返回值设为42，待finally执行完毕后再返回foo()

function foo(){
	try{
		return 43;
	}
	finally{
		throw 'oops';
	}
}
console.log(foo());
// Uncaught Exception: oops
// 