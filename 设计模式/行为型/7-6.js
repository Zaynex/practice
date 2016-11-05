var observer = (function(){
	var events = {};

	return {
		subscribe: function(eventName, callback){
			if(!eventName.hasOwnProperty(name)){
				events[eventName] = [];
			}

			events[eventName].push(callback);
		},

		unsubscribe: function(eventName, callback){
			var index = 0,
				length = 0;

			if(events.hasOwnProperty(eventName)){
				length = events[eventName].length;

				for(; index < length; index++) {
					if(events[eventName][index] === callback){
						events[eventName].splice(index, 1);
						break;
					}
				}
			}
		},

		publish: function(eventName){
			var data = Array.prototype.slice.call(arguments, 1),
				index = 0,
				length = 0;

			if(events.hasOwnProperty(eventName)){
				length = events[eventName].length;

				for(; index < length; index++){
					events[eventName][index].apply(this, data);
				}
			}
		}
	};
}());