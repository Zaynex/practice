/*
rot13编码
 */
function rot13(str) { // LBH QVQ VG!
	var arr = str.toUpperCase();
	var _A = "A".charCodeAt();
	var _Z = "Z".charCodeAt();
	for(var i = 0 ;i < arr.length; i++) {
		if((arr[i].charCodeAt() <= _Z) && (arr[i].charCodeAt()+13 > _Z)) {
			arr[i].fromCharCode(arr[i].charCodeAt()-13);
		}else((arr[i].charCodeAt() >= _Z) && (arr[i].charCodeAt() + 13 <= _Z)) {
			arr[i].fromCharCode(arr[i].charCodeAt()+13);
		}
	}
	return arr;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");

function c()
{
var obj = {v:1};
    obj.func = function()   
    {
        obj = {v:2};
    };
    
    return obj;
}

var c1 = c();
c1.func();
alert(c1.v); 

var c2 = new c();
c2.func();
alert(c2.v);   //结果为：1，为什么不是2
