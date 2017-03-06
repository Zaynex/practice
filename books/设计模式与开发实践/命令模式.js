/**
 * 解耦请求调用者和请求接受者之间的关系
 */

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");

// 虽然点击之后触发什么逻辑我们不清楚，但是我们知道点击按钮之后都会执行一些操作
var setCommand = function(button, command) {
	btn.onclick = function(){
		command.excute();
	}
}

var MenuBar = {
	refresh: function(){
		console.log("刷新菜单目录")
	}
}
var SubMenu = {
	add: function(){
		console.log("增加子菜单")
	},
	del: function(){
		console.log("删除子菜单")
	}
}

// 将所有行为都封装在命令中
var RefreshMenuBarCommand = function(receiver) {
	this.receiver = receiver;
}

RefreshMenuBarCommand.prototype.excute = function(){
	this.receiver.refresh()
}

var AddSubMenuCommand = function(receiver){
	this.receiver = receiver;
}

AddSubMenuCommand.prototype.excute = function(){
	this.receiver.add()
}
var DelSubMenuCommand = function(receiver){
	this.receiver = receiver
}
DelSubMenuCommand.prototype.excute = function(){
	// console.log("删除子菜单")
	this.receiver.del();
}


var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubmenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button2, delSubmenuCommand);


var Ryu = {
	attack: function(){
		console.log("attack");
	},
	defense: function(){
		console.log("defense");
	},
	jump: function(){
		console.log("jump");
	},
	crouch: function(){
		console.log("crouch");
	}
}

var mackCommand = function(receiver, state) {
	return function(){
		receiver[state]();
	}
};

var commands = {
	'119': 'jump',
	'115': 'crouch',
	'97': 'defense',
	'100': 'attack'
}


var commandsStack = [];

document.onkeypress = function(ev){
	var keyCode = ev.keyCode,
		command = makeCommand(Ryu, commands[keyCode]);

	if(command) {
		command();
		commandsStack.push(command);
	}
}

document.getElementById('reply').onclick = function(){
	var command;
	while( command = commandsStack.shift()) {
		command();
	}
}

// 宏命令，遍历每个command，执行 excute