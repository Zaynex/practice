function EmailFormView(){
	this.form = document.createElement("form");
	this.input = document.createElement("input");
	this.button = document.createElement("button");

	this.input.setAttribute("type", "text");
	this.input.setAttribute("placeholder", "New email address");
	this.button.setAttribute("type", "submit");
	this.button.innerHTML = "Add";
}


EmailFormView.prototype = {
	render: function(){
		this.form.appendChild(this.input);
		this.form.appendChild(this.button);

		document.body.appendChild(this.form);


		this.bindEvents();
	},

	bindEvents: function(){
		var that = this;

		this.form.addEventListener("submit", function(evt){
			evt.preventDefault();

			observer.publish("view.email-view.add", that.input.value);
		}, false);

		observer.subscribe("vmodel.email-address.added", function(){
			that.clearInputField();
		});
	},

	clearInputField: function(){
		this.input.value = "";
	}
};