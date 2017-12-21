	function findBig(str){
		var max= 1;
		var newArr = [];
		var maxNum = 0;
		for(var i = 0; i < str.length; i++){
			for(var j = i; j < str.length; j++){
				if(!(str[j]  === str[j+1])){
					newArr[i] = max;
					break;
				}else {
					newArr[i] = max++;
				}
			}
			max = 1;
		}
		console.log(newArr);
		console.log(maxNum = Math.max.apply(null, newArr));
		
		for(var i = 0; i <newArr.length; i++){
			if(newArr[i] === maxNum){
				return i;
			}
		}
	}

	console.log(findBig([2,1,2,3,4,5,2,1,2,3,4,2,2,2,2,2,2,2,3,3,3,3,3,3]));
