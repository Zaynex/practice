var p = function(){
	return new Promise(function(resolve){
		setTimeout(function(){
			resolve('p的结果')
		}, 100)
	})
}
var p2 = function (input){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log('p2拿到前面传入的值：' + input)
            resolve('p2的结果');
        }, 100);
    });
}
p()
.then(function(res){console.log('p的结果:' + res); return 'p then方法第一次返回'})
.then(function(res){console.log('p第一次then方法的返回：'+res); return 'p then方法第二次返回'})
.then(p2)
.then(function(res){console.log('p2的结果：' + res)});

global.Promise = Promise;
function Promise(fn) {
	var doneList = [],
		failList = [],
		state = 'pending';

	this.then = function(done, fail) {
		switch(state) {
			case "pending":
				doneList.push(done);
				return this;
				break;

			case 'fulfilled':
				done();
				return this;
				break;
			case 'rejected':
				fail();
				return this;
				break;
		}
	}
	function resolve(newValue) {
		state = "fulfilled";
		setTimeout(function(){
			var value = newValue;
			for(var i = 0; i < doneList.length; i++) {
				var temp = doneList[i](value);
				if(temp instanceof Promise) {
					var newP = temp;
					for(i++; i <doneList.length; i++) {
						newP.then(doneList[i]);
					}
				} else {
					value = temp;
				}
			}
			
			// 到目前为止，换了一个promise之后，拿不到新的promise resolve的值
			// doneList.forEach(function(fulfill) {
			// 	value = fulfill(value);
			// })
		}, 0)
	}
	function reject(newValue) {
		state = 'rejected';
		setTimeout(function(){
			value = newValue;
			var tempRej = failList[0](value);
			if(tempRej instanceof Promise) {
				var newP = tempRej;
				for(i = 1; i < failList.length; i++) {
					newP.then(doneList[i], failList[i])
				}
			}else {
				value = tempRej;
				doneList.shift();
				failList.shift();
				resolve(value)
			}
		}, 0)
	}
	fn(resolve, reject);
}