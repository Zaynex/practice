function Stack(){
	var items = [];
	this.push = function(element){
		return items.push(element);
	};
	this.pop = function(element){
		return items.pop(element);
	};
	this.peek = function(){
		return items[length - 1];
	};
	this.isEmpty = function(){
		return items.length === 0;
	};
	this.size = function(){
		return items.length;
	};
	this.clear = function(){
		items = [];
	};
	this.print = function(){
		//change to string
		console.log(items.toString());
	};
}

var stack = new Stack();
console.log(stack.isEmpty());
stack.push(1);
stack.push(10);
stack.push(100);
stack.push(1000);
stack.push(10000);
console.log(stack.isEmpty());
console.log(stack.pop());
console.log(stack.size());

//十进制转二进制

function divideBy2(decNumver, base){
	var remStack = new Stack(),
		rem,
		binaryString = "";
		digits = '0123456789ABCDEF';

	while(decNumver > 0) {
		rem = Math.floor(decNumver % base);
		remStack.push(rem);
		decNumver = Math.floor(decNumver/base);
	}

	while(!remStack.isEmpty()){
		binaryString += digits[remStack.pop().toString()];
	}
	return binaryString;
}

console.log(divideBy2(10, 2)); //1010
console.log(divideBy2(10, 8)); //12
console.log(divideBy2(10, 16)); //A


//平衡圆括号
function matches(open, close){
    var opens = "([{",
        closers = ")]}";
    return opens.indexOf(open) == closers.indexOf(close);
}

function parenthesesChecker(symbols){

    var stack = new Stack(),
        balanced = true,
        index = 0,
        symbol, top;

    while (index < symbols.length && balanced){
        symbol = symbols.charAt(index);
        if (symbol == '('|| symbol == '[' || symbol == '{'){
            stack.push(symbol);
        } else {
            if (stack.isEmpty()){
                balanced = false;
            } else {
                top = stack.pop();
                if (!matches(top, symbol)){
                    balanced = false;
                }
            }
        }
        index++;
    }
    if (balanced && stack.isEmpty()){
        return true;
    }
    return false;
}

console.log(parenthesesChecker('{{([][])}()}'));
console.log(parenthesesChecker('[{()]'));



//汉诺塔

function towerOfHanoi(n, from, to, helper){

    if (n > 0){
        towerOfHanoi(n-1, from, helper, to);
        to.push(from.pop());
        console.log('-----')
        console.log('Source: ' + from.toString());
        console.log('Dest: ' + to.toString());
        console.log('Helper: ' + helper.toString());
        towerOfHanoi(n-1, helper, to, from);
    }
}

var source = new Stack();
source.push(3);
source.push(2);
source.push(1);

var dest = new Stack();
var helper = new Stack();

towerOfHanoi(3, source, dest, helper);

source.print();
helper.print();
dest.print();