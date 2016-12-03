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

	this.unique = function(otherSet) {
		var uniqueSet = new Set();

		var values = this.values();
		for(let i = 0; i < values.length; i++) {
			uniqueSet.add(values[i]);
		}

		values = otherSet.values();
		for(var i = 0; i < values.length; i++) {
			uniqueSet.add(values[i]);
		}

		return uniqueSet;
	}

	this.intersection = function(otherSet) {
		var intersectionSet = new Set();

		var values = this.values();
		for(var i = 0; i < values.length; i++) {
			if(otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}

		return intersectionSet;
	}

	this.difference = function(otherSet) {
		var differenceSet = new Set();

		var vlaues = this.values();
		for(var i = 0; i < values.length; i++) {
			if(!otherSet.has(values[i])) {
				differenceSet.add(values[i]);
			}
		}
		// for(var i = 0; i < otherSet.length; i++) {
		// 	if(!values.has(otherSet[i])) {
		// 		differenceSet.add(otherSet[i]);
		// 	}
		// }
		return differenceSet;
	}

	this.subset = function(otherSet) {
		if(this.size() > otherSet.size()) {
			return false;
		}else {
			values = this.values;
			for(var i = 0; i < values.length; i++) {
				if(otherSet.has(values[i])) {
					return false
				}
			}
		}
	}
	return true;
}
