function BinarySearchTree(){
	var Node = function(key){
		this.key = key;
		this.left = null;
		this.right = null;
	};

	var root = null;
	
	this.insert = function(key){
		var newNode = new Node(key);
		if(root === null){
			root = newNode;
		}else {
			insertNode(root, newNode);
		}
	};

	var insertNode = function(node, newNode){
		if(newNode.key < node.key) {
			if(node.left === null){
				node.left = newNode;
			}else {
				insertNode(node.left, newNode);
			}
		}else {
			if(node.right === null){
				node.right = newNode;
			}else{
				insertNode(node.right, newNode);
			}
		}
	};

	//中序遍历
	//先遍历左子树 -> 根节点 -> 右子树 (中序就是根节点中间访问)
	this.inOrderTraverse = function(callback){
		inOrderTraverseNode(root, callback);
	};
	//接受一个节点和对应的回调函数
	var inOrderTraverseNode = function(node, callback){
		if(node !== null){ //中序遍历的终止条件，root是否为null
			inOrderTraverseNode(node.left, callback);
			callback(node.key);  //对这个节点进行一些操作
			inOrderTraverseNode(node.right, callback);
		}
	};

	//先序遍历就是先遍历节点自身，再遍历左子树和右子树
	this.preOrderTraverse = function(callback){
		preOrderTraverseNode(root, callback);
	};
	var preOrderTraverseNode = function(node, callback){
		if(node !== null) {
			callback(node.key);//先遍历节点本身
			preOrderTraverseNode(node.left, callback);//遍历左子树
			preOrderTraverseNode(node.right, callback);//遍历右子树
		}
	};
	//后续遍历，当前的节点最后遍历
	this.postOrderTraverse = function(callback){
		postOrderTraverseNode(root, callback);
	};
	var postOrderTraverseNode = function(node, callback){
		if(node !== null){
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	};

	this.min = function(){
		return minNode(root);
	};
	var minNode = function(node){
		if(node){
			while(node && node.left !== null){
				node = node.left;
			}
			return node.key;
		}
		return null;
	};

	this.max = function(){
		return maxNode(root);
	};
	var maxNode = function(node){
		if(node){
			while(node && node.right !== null){
				node = node.right;
			}
			return node.key;
		}
		return null;
	};
}
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(22);
tree.insert(3);
tree.insert(14);
tree.insert(65);
tree.insert(6);
function printNode(value){
	console.log(value);
}
tree.inOrderTraverse(printNode);
console.log("====================");
tree.preOrderTraverse(printNode);
console.log("====================");
tree.postOrderTraverse(printNode);
console.log("====================");
console.log(tree.max());
console.log(tree.min());