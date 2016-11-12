//数组去重
var arr = [1,2,3,1,2,3,4,5];
function uniqueArr(arr){
	var newArr = [];
	var N = arr.length;
	for(var i = 0; i < N; i++){
		if(newArr.indexOf(arr[i]) === -1){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
var a = uniqueArr(arr);
console.log(a);

//先排序，再去重
function uniqueArr2(arr){
	arr.sort();
	var newArr = [];
	for(var i = 0; i <arr.length-1; i++){
		if(arr[i] != arr[i+1]){
			newArr.push(arr[i]);
		}
	}
}

//hash数组去重,空间换时间
function uniqueArr3(arr){
	var hashTable = {},
		data = [];
	for(var i = 0; i < arr.length; i++){
		if(!hashTable[arr[i]]) {
			hashTable[arr[i]] = true;
			data.push(arr[i]);
		}
	}
	return data;
}

