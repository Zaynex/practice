Function.prototype.bind = function(obj){
    var ctx = this,
        args = arguments;
    // 当某个函数调用bind方法时本质就是将其上下文修改为 传入的obj
    // 例子中就是将原move函数中的this指向了 point
    return function() {
        ctx.apply(obj, Array.prototype.slice.call(args, 1))
    }
}
function move(x, y) {
    this.x += x;
    this.y += y;
}
var point = {x:1, y:2};
var pointmove = move.bind(point, 2, 2);
pointmove(); // {x:3, y:4}
console.log(point)
