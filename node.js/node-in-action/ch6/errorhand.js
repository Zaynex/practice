function errorHandler() {
	var env = process.env.NODE_ENV || 'development';
	return function(err, req, res, next){
		res.statusCode = 500;
		switch(env) {
			case 'development':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err));
				break;
			default:
				res.end('Server error');
		}
	}
}

module.exports = errorHandler;

//如果中间件出现错误，会跳过其他中间件，直接到这个error处理的中间件