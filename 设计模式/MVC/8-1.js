function EmailModel(data){
	this.emailAddress = data || [];
}

EmailModel.prototype = {
	add: function(email){
		this.emailAddress.unshift(email);
		observer.publish('model.email-address.added', email);
	},

	remove: function(email){
		var index = 0,
			length = this.emailAddress.length;

		for(; index < length; index++){
			if(this.emailAddress[index] === email){
				this.emailAddress.splice(index, 1);
				observer.publish("model.email-address.remove", email);

				break;
			}
		}
	},

	getAll: function(){
		return this.emailAddress;
	}
};