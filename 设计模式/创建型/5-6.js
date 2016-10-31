var formBulder = new FormBuilder(),
	form;

formBulder.addField("text", "Enter your address");
formBulder.addField("email", "email address");
formBulder.addField("button", "submit");


form = formBulder.getForm();

window.addEventListener("load", function(){
	document.body.appendChild(form);
}, false);