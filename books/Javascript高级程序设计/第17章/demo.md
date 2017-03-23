### try-catch
```
function testFinally(){
	try{
		return 2;
	}catch(error){
		return 1;
	}finally{
		return 0;
	}
}
```
不管是否捕捉到错误，finally语句都是会执行的。上面的代码如果运行正常的话返回return2但是被finally语句覆盖所以是return 0 。所以在使用的时候一定要小心。、

### 错误类型
- EvalError: 如果以非直接调用的方法使用eval属性的值或者为eval属性赋值。
```
new eval();
eval = foo; // Eval Error
```

- RangeError: 数值超出相应的范围触发
- ReferenceError: 在找不到对象的情况下会发生该错误，比如访问不存在的变量。
- SyntaxError: 错误语法
- TypeError: 变量保存意外的类型或者是不存在的方法。（执行特定类型操作时，变量类型不符合要求所致）
```
var o = new 10;
alert("name" in o);
Function.prototype.toString.call("name");
```
- encodeURI: URI格式不正确

### 抛出错误
```
throw "new Error";
```
当运行到throw操作符时，代码会立即停止。

#### 利用原型链自定义错误类型
function CustomError(message){
	this.name = "CustomError";
	this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError("my message");

#### 抛出错误的时机
```
function process(value){
	values.sort();

	for(var i=0, len=values.length; i< len;i++){
		if(values[i] > 10){
			return values[i];
		}
	}
	return -1;
}
```
如果传递的参数不是数组，那就会调用失败。
- IE: 属性或方法不存在
- FF：values.sort()不是函数
- Sf：值undefined不是对象
- Ch: 对象名没有方法sort
- op: 类型不匹配