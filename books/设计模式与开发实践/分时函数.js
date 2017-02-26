/*
对于传入的数据做分批加载
这里用到的是 Math.min来截取长度
 */
var timeChunk = function(args, fn, count){
	var obj,
		t;
	var len = args.length;

	var start = function(){
		for(var i = 0; i < Math.min(count || 1, args.length); i++) {
			var obj = args.shift();
			fn(obj);
		}
	}

	return function(){
		t = setInterval(function(){
			if(args.length === 0) {
				return clearInterval(t);
			}
			start();
		}, 300)
	}
}




var ary = [];
for(var i = 0; i < 1000; i++) {
	args.push(i);
}


var renderFriendList = timeChunk(ary, function(n) {
	var div = document.createElement("div");
	div.innerHTML = n;
	document.body.appendChild(div)
}, 30)
renderFriendList();

