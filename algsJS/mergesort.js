//merge的思想是，对半分，左边一个数组，右边一个数组，两个 数字的index依次对比，并且小的那个再++，也就是小的继续遍历对比，把小的塞到新的数组中
function merge(left, right){
	var result = [],
		il = 0,
		ir = 0;

	while(il < left.length && ir <right.length){
		if(left[il] < right[ir]){
			result.push(left[il++]);
		}else {
			result.push(right[ir++]);
		}
	}
	// console.log("il" + il + "ir" + ir);
	return result.concat(left.slice(il)).concat(right.slice(ir));
}

// function mergeSort(items){
// 	if(items.length < 2){
// 		return items;
// 	}

// 	var middle = Math.floor(items.legth)/2,
// 		left = items.slice(0, middle),
// 		right = items.slice(middle);

// 	return merge(mergeSort(left), mergeSort(right));
// }


function mergeSort(items){
	if(items.length < 2){
		return items;
	}

	var middle = Math.floor(items.length)/2,
		left = items.slice(0,middle),
		right = items.slice(middle),
		params = merge(mergeSort(left), mergeSort(right));

		params.unshift(0, items.length);
		items.splice.apply(items, params);
		return items;
}

var str = [1,24,234,53,45,56,3,234,58,9];
console.log(mergeSort(str));

//上面的这种方式会频繁的自调用。合并排序算法同样可以用迭代实现

function mergeSort(items){
	if(items.length == 1) {
		return items;
	}

	var work = [];

	for(var i = 0; i < items.length; i++){
		work.push([items[i]]);
	}
	work.push([]);//如果长度为奇数

	for(var lim = len; lim > 1; lim =(lim + 1) /2){
		for(var j =0, k =0; k < lim; j++, k+=2){
			work[j] = merge(work[k], work[k+1]);
		}
		work[j] = [];//如果长度为奇数95
	}

	return work[0];
}