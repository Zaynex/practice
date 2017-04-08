// function delay(time){
// 	return new Promise(function(resolve, reject){
// 		setTimeout(resolve, delay);
// 	})
// }

// delay(3000)
// 	.then(function STEP2(){
// 		console.log('SETP 2 after 3000 times');
// 		return delay(200)
// 	})
// 	.then(function SETP3(){
// 		console.log('SETP 3 after another 200');
// 		// return dalay()
// 	})
// 	.then(function SETP4(){
// 		console.log('step 4 after next Job');
// 		return delay(5000);
// 	})
// 	.then(function SETP5(){
// 		console.log('step 5 after 5000ms');
// 	})


var p = new Promise(function(resolve, reject){
	reject('oops');
});
var p2 = p.then(
	function fulfilled(){
		console.log('111');
	})
	.then(function foo(){}, function reject(){console.log('error')})