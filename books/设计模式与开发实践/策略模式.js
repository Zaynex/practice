/**
 * 定义一系列算法，将他们封装起来，并使他们可以相互替换
 * 乍一听感觉这种方式是用来代替 switch 语句或者是过多的 if 语句
 */

var calculateBouns = function(performanceLevel, salary) {
	
	if(performanceLevel === 'S') {
		return salary * 4
	}
	if(performanceLevel === 'A') {
		return salary * 3
	}
	if(performanceLevel === 'B') {
		return salary * 2
	}
}


var performanceS = function(){};
performanceS.prototype.calculate = function(salary){
	return salary * 4
}
var performanceA = function(){};
performanceA.prototype.calculate = function(salary){
	return salary * 3
}
var performanceB = function(){};
performanceB.prototype.calculate = function(salary){
	return salary * 2
}

var Bouns = function(){
	this.salary = null;
	this.strategy = null;
}

Bouns.prototype.setSalary = function(salary){
	this.salary = salary
}
Bouns.prototype.setStrategy = function(strategy){
	this.strategy = strategy
}
Bouns.prototype.getBouns = function(){
	return this.strategy.calculate(this.salary);
}

var bouns = new Bouns();
bouns.setSalary(10000);
bouns.setStrategy(new performanceS());

console.log(bouns.getBouns());


/******************* JS版本 ***************************/
/*
所有计算的逻辑分布在各个策略对象中，根据不同的策略执行不同的算法
 */
var strategies = {
	'S': function(salary){
		return salary * 4
	},
	'A': function(salary){
		return salary * 3
	}
}

var calculateBouns = function(level, salary) {
	return strategies[level](salary)
}
console.log(calculateBouns('S', 10000));



/**
 * 表单检验
 */

var registerForm = document.getElementById("registerForm");
registerForm.onsubmit = function(){
	if(registerForm.userName.value === '') {
		alert('用户名不能为空')
		return false
	}

	if(registerForm.password.value.length < 6) {
		alert('密码不能少于6位')
		return false
	}

	if(!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
		alert("手机号码格式不正确")
		return false
	}
}


var strategies = {
	isNonEmpty: function(value, errorMsg) {
		if(value === '') {
			return errorMsg;
		}
	},
	minLength: function(value, length, errorMsg) {
		if(value.length <　length) {
			return errorMsg
		}
	},
	isMobile: function(value, errorMsg) {
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
			return errorMsg
		}
	}
}

var validataFunc = function(){
	var validator = new Validator();

	validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

	var errorMsg = validator.start();
	return errorMsg;
}

var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){
	var errorMsg = validataFunc()
	if(errorMsg) {
		alert(errorMsg);
		return false;
	}
}

var Validator = function(){
	this.cache = []
}

Validator.prototype.add = function(dom, rule, errorMsg) {
	var ary = rule.split(':');
	this.cache.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return strategies[strategy].apply(dom, ary);
	})
}
Validator.prototype.start = function(){
	for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
		var msg = validatorFunc();
		if(msg) {
			return msg
		}
	}
}


// 其实策略模式很像高阶函数，根据不同的类型将函数作为参数传入，JS本身就融入了策略模式。