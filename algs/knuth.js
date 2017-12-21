//每次把前面的数和后面的数交换位置
function knuth(arr){
	var N = arr.length;
	for(var i = 0; i < N; i++){
		//保证每个数都能与后面一个数字进行交换
		var r = i + Math.floor(Math.random()*(N - i));
		var temp = arr[r];
		arr[r] = arr[i];
		arr[i] = temp;
		console.log("r现在是 " + r);
	}
	return arr;
}

var str = [0,1,2,3,4,5,6,7,8,9,10,11];
console.log(knuth(str));


// 利用array.sort()

str.sort(function(){
	return (0.5 - Math.random());
});

console.log(str);


// ES6
function shuffle(arr){
	let n = arr.length,random;
	while(0!=n){
		random = (Math.random()*n--) >>> 0; //无符号右移运算符向下取整
		[arr[n], arr[random]] = [arr[random], arr[n]];
	}
	return arr;
}

var str = [0,1,2,3,4,5,6,7,8,9,10,11];
console.log(shuffle(str));