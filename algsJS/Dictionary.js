/**
 * 字典存储方式键值对的形式
 */
function Dictionary(){
	var items = {};
	this.has = function(value) {
		return items.hasOwnProperty(value);
	}
	this.set = function(key, value) {
		items[key] = value;
	}

	this.remove = function(key) {
		if(this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	}

	this.get = function(key) {
		return this.has(key) ? items[key] : undefined;
	}

	this.values = function() {
		var values = {};
		for(var k in items) {
			if(this.has(k)) {
				values.push(items[k]);
			}
		}
		return values;
	}

	this.getItems = function() {
		return items;
	}
	this.clear = function() {
		items = {};
	}
	this.size = function() {
		return items.length;
	}
	this.keys = function() {
		var keys = [];
		for(var k in items) {
			if(this.has(k)) keys.push(k);
		}
		return keys;
	}
}

var dictionary = new Dictionary();
dictionary.set('Zaynex','Zaynex@126.com');

dictionary.keys();
// console.log(dictionary.has('Zaynex'));