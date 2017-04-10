var http = {
	makeRequest: function(type, url, cb, data){
		var xhr = new XMLHttpRequest(),
			STATE_LOADED = 4,
			STATUS_OK = 200;

		xhr.onreadstatechange = function(){
			if(xhr.readyState !== STATE_LOADED){
				return;
			}

			if(xhr.status == STATUS_OK) {
				cb(xhr.responseText);
			}
		};

		xhr.open(type.toUpperCase(), url);
		xhr.send(data);
	}
};

//获取数据
http.makeRequest("get", '/user/12345', function(response){
	alert("HTTP GET response received.User data:" + response);
});

//更新数据
http.makeRequest("post", '/user/12345', function(response){
	alert("HTTP post response received.User data:" + response);
}, "company=AKQA&name=Den&200del");



//通过命名空间的形式改写，并且划分 get和post 两个方法
var myProject = {
	data: {
		ajax: (function(){
			function createRequestObj(callbcak){
				var xhr = new XMLHttpRequest(),
				STATE_LOADED = 4,
				STATUS_OK = 200;

				xhr.onreadstatechange = function(){
					if(xhr.readyState !== STATE_LOADED){
						return;
					}

					if(xhr.status == STATUS_OK) {
						cb(xhr.responseText);
					}

				};

				return xhr;
			}

			return {
				get: function(url, callbcak){
					var responseObj = createRequestObj(callbcak);

					responseObj.open('GET', url);
					responseObj.send();
				},

				post: function(url, data, callbcak){
					var requestObj = createRequestObj(callbcak);
					requestObj.open('POST', url);
					requestObj.send(data);
				}
			};
		}())
	}
};

myProject.data.ajax.get("/user/12345", function(response){
	//...
});

myProject.data.ajax.post("/user/12345", "company=AKQA&name=%200del",function(response){
	//...
});

// 为了避免在代码库中其余部分重写每一个对http.makeRequest()的方法的调用，创建一个适配器映射旧接口到新方法

function httpToAjaxAdapter(type, url, callbcak, data){
	if(type.toLowerCase() === 'get'){
		myProject.data.ajax.get(url, callbcak);
	}else if(type.toLowerCase() === 'post'){
		myProject.data.ajax.post(url, data, callbcak);
	}
}

//应用适配器
http.makeRequest = httpToAjaxAdapter;

