function HashTable() {
	var table = [];
	var loseloseHashCode = function (key) {
		var hash = 0;
		for(var i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}

		return hash % 37;
	}

	this.put = function(key, value) {
		var position = loseloseHashCode(key);
		// console.log(position + '-' + key);
		if(table[position] === undefined) {
			table[position] = new LinkedList();
		}
		table[position].append(new ValuePair(key, value));
	}

	this.get = function(key) {
		return table[loseloseHashCode(key)];
	}
	//因为散列表的特殊性，只能将其值设为undefined否则因为位置的变更而改变hash值
	this.remove = function(key) {
		table[loseloseHashCode(key)] = undefined;
	}

	this.print = function() {
		for(var i = 0; i < table.length; i++) {
			if(table[i] !== undefined) {
				console.log(i + " : " + table[i]);
			}
		}
	}

	var ValuePair = function(key, value) {
		this.key = key;
		this.value = value;

		this.toString = function() {
			return '[' + this.key + ' - ' + this.vlaue + ']';
		}
	}
};

