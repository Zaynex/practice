function serialize(a){
	var s= [];
	if(a.constructor === Array){
		for(var i = 0; i <a.length; i++){
			s.push(a[i].name + "=" + encodeURIComponent(a[i].value));
		}
	}else{
		for(var j in a){
			s.push(j + "=" + encodeURIComponent(a[j]));
		}
	}
	return s.join("&");
}