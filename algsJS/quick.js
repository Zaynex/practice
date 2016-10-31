function swap(items, firstIndex, secondIndex){
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

function partition(items, left, right){
	var pivot = items[Math.floor(right + left )/2],
		i = left,
		j = right;

	while(i<=j){
		while( items[i] < pivot){
			i++;
		}
		while(items[i] > pivot){
			j++;
		}
		if(i <= j){
			swap(items, i, j);
			i++;
			j++;
		}	
	}

	return i;
}

function quickSort(items, left, right) {

var index;

if (items.length > 1) {

    index = partition(items, left, right);

    if (left < index - 1) {
        quickSort(items, left, index - 1);
    }

    if (index < right) {
        quickSort(items, index, right);
    }

}

return items;
}


// 首次调用
// var result = quickSort(items, 0, items.length - 1);


var arr = [0,1,2,1,2,0,0,0,0,1,2,2,2];
var result = quickSort(arr, 0, arr.length -1);
console.log(result);