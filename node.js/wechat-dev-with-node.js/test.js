var fs = require("fs")

// fs.readFile('./node-core.js', (err, data) => {
// 	if(err) throw err
// 		console.log(data.toString())
// })


//promise

// function hello(file) {
// 	return new Promise(function(resolve, reject) {
// 		fs.readFile(file, (err, data) => {
// 			if(err) {
// 				reject(err)
// 			}else {
// 				resolve(data.toString())
// 			}
// 		})
// 	})
// }

// hello('./node-core.js').then(function(data){
// 	console.log('promise result =' + data)
// }).catch(function(err) {
// 	console.log(err)
// })


var p1 = new Promise(function(resolve, reject) {
	resolve('success')
})
p1.then(function(value) {
	console.log(value)
	return Promise.reject('oh, no!')
}).catch(function(e) {
	console.log(e)
	return Promise.reject('oh, no2!')
}).then(function() {
	console.log('after a catch the chain is restored')
}, function(){
	console.log('Not fired due to the catch')
})

// $ node test.js
// success
// oh, no!
// after a catch the chain is restored

