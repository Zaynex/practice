function Dictionary() {
	var items = {};
	this.has = (key) => {
		key in items
	};

	this.set = (key, value) => {item[key] = value}
	this.remove = (key) => {if(this.has(key)) delete items[key]; else return false}
	this.get = (key) => this.has(key) ? items[key] : undefined;
	this.values = () => {for(var k in items){if(this.has[k]){values.push(items[k])}}}
} 