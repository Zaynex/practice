function quicksort3(a) {
	if(a.length <= 1) return a;
	var last =a.pop(),
		left = [],
		right = [],
		mid = [last];

	a.forEach(function(item){
		if(item < last)
			left.push(item);
		else if(item > last)
			right.push(item);
		else 
			mid.push(item);
	});

	var _left = quicksort3(left),
		_right = quicksort3(right);
	return _left.concat(mid, _right);
}

function quick(a){
	if(a.length <= 1) return a;
	var last = a.pop(),
		left = [],
		right = [];

	a.forEach(function(item){
		if(item <= last)
			left.push(item);
		else 
			right.push(item);
	});

	var _left = quick(left),
		_right = quick(right);
	return _left.concat(last, _right);
}


var arr  = [];
for(var i = 0; i < 1000; i++)
	for(var j = 0; j < 10; j++)
		arr.push(i);

var str = [];
for(var i = 0;i < 10000; i++){
	str.push(Math.random()*(100-1+1)+100);
	
}


console.log(console.time('quicksort'));
quick(str.concat());
console.log(console.timeEnd('quicksort'));


console.log(console.time('quick3'));
quicksort3(str.concat());
console.log(console.timeEnd('quick3'));


console.log(console.time('v8'));
str.concat().sort(function(a, b){
	return b - a;
});
console.log(console.timeEnd('v8'));