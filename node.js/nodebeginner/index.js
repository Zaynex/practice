var server = require('./server');
var router = require('./router');
var requestHeaders = require('./requestHeaders');
var handler = {};
handler['/'] = requestHeaders.start;
handler['/start'] = requestHeaders.start;
handler['/upload'] = requestHeaders.upload;


server.start(router.route, handler);