function selection(arr){
	var l = arr.length;
	for(var i = 0; i < l; i++) {
		var min = i;
		for(var j = i + 1; j < l; j++){
			if(less(arr[j], arr[min])) min = j;
		}
		exch(arr, i, min);
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

//selection([1,10,11,12,5,3,2,73,52]);