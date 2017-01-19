// var connect = require('connect'),
// 	http = require("http")

// var app = connect()

// app.use('/', function fooMiddleware(req, res, next) {
// 	res.end('Hello from connect2')
// })
// app.use('/2', function fooMiddleware(req, res, next) {
// 	res.end('Hello from connect2')
// })

// // 按顺序最终匹配
// app.use(function(req, res) {
// 	res.end('Hello from connect')
// })
// http.createServer(app).listen(3000)

// var express = require('express')
// var app = express()
// var path = require('path')
// var open = require('open')

// app.use(express.static(path.join(__dirname, 'www/')))

// app.get('/', function(req, res){
// 	res.send('Hello world')
// })

// app.listen(4001)
// open('http://127.0.0.1:4001');	

var express = require('express')
var app = express()

function m1(req, res){
	console.log("m1")
}

function m2(req, res) {
	console.log('m2')
}

app.get('/', m1, m2, function(req, res){
	res.send('hell world')
})

app.listen(4001)