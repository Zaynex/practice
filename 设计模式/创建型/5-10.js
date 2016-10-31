var cookie = (function(){
	var allCookies = document.cookie.split(";"),
		cookies = {},
		cookiesIndex = 0,
		cookiesLength = allCookies.length,
		cookie;

	for(; cookiesIndex < cookiesLength; cookiesIndex++) {
		cookie = allCookies[cookiesIndex].split("=");
		cookies[unescape(cookie[0])] = unescape(cookie[1]);
	}

	return {
		get: function(name) {
			return cookies[name] || "";
		},
		set: function(name, value) {
			cookies[name] = value;
			document.cookie = escape(name) + "=" + escape(value);
		}
	};
})();

cookie.set("name", "Zaynex");
cookie.set("age", "22");
alert(cookie.get("name"));