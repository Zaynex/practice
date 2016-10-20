/**
 * 希尔排序
 * 常数因子序列（3^k-1)
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function shell(arr){
	var l = arr.length;
	var h = 1;
	while(h < l/3) h = 3*h + 1; //取到最大的 3^k+1这个值，放到循环里以此减少
	//希尔排序在插入排序中加一个外循环
	//希尔排序是以h为常数因子去跟两个数比较大小并交换，然后常数因子逐渐减小，最后为1，这里巧妙在最后整除后多了个1，而1正是插入排序的方式，即相邻数比较。
	while(h >= 1){
		for(var i = 0; i < l; i++) {
			//如果当前这个数小于前一个数的时候则遍历从前一个数到索引值为0的数进行比较
			for(var j = i; j > 0 && less(arr[j], arr[j-1]); j--){
				exch(arr, j, j-1);
			}
			h = h/3;
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

shell([1,5,20,42,45,432,75,11,222,0,32,2,29,2]);