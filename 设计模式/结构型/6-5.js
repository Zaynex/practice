function ajaxCall(type, url, callback, data){
	var xhr = (function(){
		try{
			return new XMLHttpRequest();
		}
		catch(e){}

		try{
			return new ActiveXMLRequest("Msxml2.XMLHTTP.6.0");
		}
		catch(e){}

		try{
			return new ActiveXMLRequest("Msxml2.XMLHTTP.3.0");
		}
		catch(e){}
		throw new Error("Ajax not supported in this broswer");
	}()),

	STATE_LOADED = 4,
	STATUS_OK = 200;

	xhr.onreadystatechange = function(){
		if(xhr.readyState !== STATE_LOADED){
			return;
		}
		if(xhr.status == STATUS_OK){
			callback(url.responseText);
		}
	};

	xhr.open(type.toUppercase(), url);
	xhr.send(data);
}