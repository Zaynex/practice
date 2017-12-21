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


function hotPotato(nameList, num){
	var queue = new Queue();
	for(var i = 0;i < nameList.length; i++){
		queue.enqueue(nameList[i]);
	}


	var eliminated = "";
	while(queue.size() > 1){
		//从队列开头移除一项，再移到末尾
		for(var i = 0; i < num; i++){
			queue.enqueue(queue.dequeue());
		}
		//当num的时候这个队列中的元素就要被移除掉
		eliminated = queue.dequeue();
		console.log(eliminated + "在击鼓传花游戏中被淘汰");
	}

	return queue.dequeue();
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
var winner = hotPotato(names, 7);
console.log('胜利者：' + winner);