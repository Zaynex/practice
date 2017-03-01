var Iterator = function(obj) {
	var current = 0;
	var next = function(){
		current += 1
	}

	var isDone = function(){
		return current >= obj.length
	};

	var getCurrItem = function(){
		return obj[current]
	}

	return {
		next: next,
		isDone: isDone,
		getCurrItem: getCurrItem
	}
};

var compare = function(Iterator1, Iterator2){
	while(!Iterator1.isDone() && !Iterator2.isDone()) {
		if(Iterator1.getCurrItem() !== Iterator2.getCurrItem()) {
			throw new Error("Iterator1和 Iterator2 不相等");
		}
		Iterator1.next();
		Iterator2.next();
	}
	console.log("Iterator1和 Iterator2 相等")
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
compare(iterator1, iterator2)