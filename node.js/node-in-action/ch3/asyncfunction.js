// function asyncFunction(callback){
// 	setTimeout(callback, 200);
// }

// var color = 'blue';

// asyncFunction(function(){
// 	console.log('this color is ' + color);
// })

// color  = 'green';
// 


function asyncFunction(callback) {
	setTimeout(callback, 2000);
}
console.log('hello');
var color = 'blue';


// 用闭包可以锁定 color 的值。把当前的color传入到匿名函数中，闭包里的color不会受到外部的color变化影响
(function(color){
	asyncFunction(function(){
		console.log('this color is ' + color)
	})
})(color);

color = 'green';
console.log('hello again');