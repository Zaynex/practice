function LinkedList(){
	var Node = function(element){
		this.element = element;
		this.next = null;
	};

	var length = 0;
	var head = null;

	/**
	 * 链表末尾添加一个元素
	 * 列表为空时，设当前节点为head节点
	 * 链表不为空时，辅助变量赋值为head节点，遍历到链表的底部再添加节点
	 * 长度加1
	 * @param  {[type]} element 新建的节点
	 * @return {[type]}         [description]
	 */
	this.append = function(element){
		var node = new Node(element),
			current;

		if(head === null){
			head = node;
		}else {
			current = head;
			while(current.next){
				current = current.next;
			}
			current.next = node;
		}
		length++;
	};

	this.insert = function(position, element){
		if(position >= 0 && position <= length){
			var node = new Node(element),
				current = head,
				previous,
				index = 0;
			if(position === 0){
				node.next = current;
				head = node;
			}else {
				while(index++ < position){
					previous = current;
					current = current.next;
				}
				node.next = current;
				previous.next = node;
			}
			length++;
			return true;
		}else {
			return false;
		}
	};

	this.removeAt = function(position){
		if(position > -1 && position < length){
			var current = head,
				previous,
				index = 0;
			if(position === 0){
				head = current.next;
				//因为JS垃圾回收机制可以自动清除内存，但是最好还是将被清除的节点手动设置为null，作者的做法是将它返回了。
			}else {
				while( index++ < position){
					previous = current;
					current = current.next;
				}
				//将previous和 current的下一项连起来，从而跳过current,就可以删除它了
				previous.next = current.next;
			}
			length--;

			return current.element;
		}else {
			return null;
		}
	};

	this.remove = function(element){
		var index = this.indexOf(element);
		return this.removeAt(index);
	};

	this.indexOf = function(element){
		var current = head,
			index = -1;
		while(current){
			if(element === current.element){
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	};

	this.isEmpty = function(){
		return length === 0;
	};

	this.size = function(){
		return length;
	};

	this.toString = function(){
		var current = head,
			string = '';
		while(current){
			string = current.element;
			current = current.next;
		}
		return string;
	};

	this.indexOf = function(element){
		var current = head,
			index = -1;

		while(current){
			if(element === current.element){
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	};
	this.getHead = function(){
		return head;
	};
}

var list = new LinkedList();
list.append(11);
list.append(12);