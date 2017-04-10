var element = {
	allElements: [],

	get: function(id) {
		var elem = document.getElementById(id);
		this.allElements.push(elem);
		return elem;
	},

	create: function(type) {
		var elem = document.createElement(type);
		this.allElements.push(elem);
		return elem;
	},

	getAllElements: function(){
		return this.allElements;
	}
},

header = element.get("header"),
input = element.create("input"),
allElements = element.getAllElements();

alert(allElements.length);