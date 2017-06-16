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


function Promise(fn) {
    let value = null,
        state = 'pending',
        callbacks = [];

    // 调用then方法，注册回调函数
    //this.then = (onFulfilled) => {
        if(state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    //};
    this.then = (onFulfilled) => {
    	return new Promise((resolve) => {
    		handle({
    			onFulfilled: onFulfilled || null,
    			resolve: resolve
    		})
    	})
    }

    function handle(callback) {
    	if(state === 'pending') {
    		callback.push()
    	}
    }

    // 创建Promise实例时传入的函数会被赋予一个函数类型的参数，即resolve
    //，它接收一个参数value，代表异步操作返回的结果，当一步操作执行成功
    // 后，用户会调用resolve方法，这时候其实真正执行的操作是将callbacks
    // 队列中的回调一一执行；
    
    // resolve加setTimeout() 让所有同步 转换成异步
    function resolve(value) {
            newValue = value;
            state = 'fulfilled'; 
        setTimeout((){
            callbacks.forEach((callback) => callback(value))
        }, 0)
    };

    fn(resolve);
}