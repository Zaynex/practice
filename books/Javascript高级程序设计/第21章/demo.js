//ie7+
var xhr = new XMLHttpRequest();


function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject != 'undefined') {
		if(typeof arguments.callee.activeXString != "string") {
			var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
			i,len;

			for(i = 0, len = versions.length; i < len; i++) {
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch(ex) {
					//
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}

//请求类型（get,post等），请求的URL、是否异步发送请求的布尔值
xhr.open('get','example.php',false);
xhr.send(null);
if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	alert(xhr.responseText);
}else {
	alert('Request was unsuccessful:' + xhr.status);
}

var xhr = createXHR();
xhr.onreadyStatechange = function(){
	if (xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			alert(xhr.responseText);
		}else{
			alert("Request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('get','example.txt','true');
xhr.setRequestHeader("Myheader","Myvalue");
xhr.send(null);