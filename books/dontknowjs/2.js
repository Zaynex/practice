/**
 * 判断是否全等
 * 1/ -0 -Infinity
 * 1/ 0 Infinity
 */
if(!Object.is) {
	Object.is = function(v1, v2){
		if(v1 === 0 && v2 === 0) {
			return 1 /v1 === 1/v2;
		}
		// check NaN
		if(v1 !== v1) {
			return v2 !== v2
		}
		//other
		return v1 === v2
	}
}


// 传递a时，实际上是将a的一个复本赋值给x.而a仍然指向[1,2,3];
function foo(x) {
	x.push(4); 
	x; // [1,2,3,4];

	x = [4, 5, 6];
	x.push(7);
	x; // [4,5,6,7]
}
a = [1, 2, 3];
foo(a);
console.log(a)


// 如果要将a值变为[4,5,6,7]，必须更改x指向的数组，而不是为x赋值一个新的数组
function foo(x) {
	x.push(4);
	x;

	x.length = 0;
	x.push(4, 5, 6, 7);
	x;
}
var a = [1,2,4];
foo(a);
a; // [4,5,6,7]