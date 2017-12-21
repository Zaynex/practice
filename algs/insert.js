function insert(arr){
	var l = arr.length;
	for(var i = 0; i < l; i++) {
		//如果当前这个数小于前一个数的时候则遍历从前一个数到索引值为0的数进行比较
		for(var j = i; j > 0 && less(arr[j], arr[j-1]); j--){
			exch(arr, j, j-1);
		}
	}
	return arr;
}
function less(a,b){
	return a < b ;
}

function exch(arr, i, j) {
	var t = arr[i];
	arr[i] = arr[j];
	arr[j] = t;
}

insert([1,5,20,42,45,432,75]);