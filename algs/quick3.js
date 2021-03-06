var startTime,
	endTime,
	duration;
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
startTime = new Date();
var arr = [0,1,2,1,2,0,0,0,0,1,2,2,2,2,2,2,2,2,2,3,3,3,3];
console.log(quicksort3(arr));
endTime = new Date();
duration = endTime.getTime() - startTime.getTime();
console.log(duration);
