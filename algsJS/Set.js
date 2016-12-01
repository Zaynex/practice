function Set() {
	var items = {};
	// this.has = function(value) {
	// 	return value in items;
	// }
	this.has = function(value) {
		return items.hasOwnProperty(value);
	}

	this.add = function(value) {
		if(!this.has(value)) {
			items[value] = value;
			return true
		}
	}
	this.remove = funtion(value) {
		if(this.has(value)) {
			delete	items[value];
			return true;
		}
		return false;
	}

	this.clear = function() {
		items = {};
	}

	this.size = function() {
		return Object.keys(items).length;
	}

	this.sizeLegacy = function() {
		var count = 0;
		for(let prop in items) {
			if(items.hasOwnProperty(prop)) {
				++count;
			}
		}
	}

	this.values = function() {
		return Object.keys(items);
	}

	this.valuesLegacy = function() {
		var keys = [];
		for(let key in items) {
			keys.push(key);
		}

		return keys;
	}
}
