var getAjaxPromise = function(option){
	return new Promise(resolve, reject){
		$.ajax({
			url: option.url,
			type: option.type || 'GET',
			data: option.data || '',
			success: function(data){
				data && resolve(data)
			},
			error: function(err){
				err && reject(err)
			}
		})
	}
}
var p1 = getAjaxPromise({
	url: 'test1.url',
	type: 'GET',
	data: {
		method: 'promition',
		pt: 1
	}
})

p1.then(function(data1){
	console.log('test1.url的请求内容是' + data1);
	return new getAjaxPromise({
		url: 'test2.url'
	})
})
.then(function(data2){
	console.log('test2.url的请求内容是' + data2);
})