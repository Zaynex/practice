function isFunction(lol){
    return typeof lol === 'function';
}

function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
}


var a = {
    ok: true
}

b = a;
a.ok = "false";
b;


// var person = {ok:1};
// function setName(obj){
//     // obj.name = 'zaynex';
//     obj = new Object();
//     obj.name = 'zaynex';
//     // 参数按值传递，这种方式重写了参数，相当于是在局部作用域中又创建了一个新对象，不影响外部参数
//     // 所以外部的person不变
// }

// function setName(obj){
//     obj.name = 'zaynex';
//     // 由于函数内部引用的都是同一个对象，所以修改有效，外部的对象也会受到影响
// }
// setName(person);