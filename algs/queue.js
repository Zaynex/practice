function Queue(){
	var items = [];
	this.enqueue = function(element){
		return items.push(element);
	};
	this.dequeue = function(){
		return items.shift();
	};
	this.front = function(){
		return items[0];
	};

	this.isEmpty = function(){
		return items.length === 0;
	};

	this.print = function(){
		console.log(items.toString());
	};
	this.clear = function(){
		items = [];
	};

	this.size = function(){
		return items.length;
	};

}