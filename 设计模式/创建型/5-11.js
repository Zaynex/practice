var myObject = {
	data: {
		ajax: {
			get: function(url, callback) {
				var xhr = new XMLHttpRequest(),
					STATE_LOADED = 4,
					STATUS_OK = 200;

				xhr.onreadystatechange = function(){
					if(xhr.readState !== STATE_LOADED) {
						return;
					}
					if(xhr.status === STATUS_OK) {
						callback(xhr.responseText);
					}
				};

				xhr.open("GET", url);
				xhr.send();

			}
		}
	}
};

myObject.data.cookies = {
	get: function(name) {
		var output = "",
			escapeName = escape(name),
			start = document.cookie.indexOf(escapeName + "="),
			end = document.cookie.indexOf(";", start);

		end = end === -1 ? (document.cookie.length -1) : end;

		if(start >= 0) {
			output = document.cookie.substring(start + escapeName.length + 1, end);
		}
		return unescape(output);
	},

	set: function(name, value){
		document.cookie = escape(name) + "=" + escape(value);
	}
};

myObject.data.ajax.get("/user/12345", function(response){
	alert("HTTP GET response received" + response);
});

myObject.data.cookies.set("comapeny", "AJD");
myObject.data.cookies.set("name", "ayne");

alert(myObject.data.cookies.get("comapeny"));
alert(myObject.data.cookies.get("name"));