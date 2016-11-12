function getQueryStringArgs(){
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
		args = {},

	items = qs.length ? qs.split('&') : [],
	item = null,
	name =  null,
	valu = null,
	i = 0,
	len = items.length;

	for(i = 0; i < len; i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if(name.length){
			args[name] = value;
		}
	}
	return args;
}


var w3w = "http://blog.sina.com.cn/s/blog_5082f7b901015r2r.html?key1=1";
console.log(getQueryStringArgs(w3w));