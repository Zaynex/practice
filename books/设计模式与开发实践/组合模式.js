var MacroCommand = function(){
    return {
        commandslist: [],
        add: function(command) {
            this.commandslist.push(command);
        },
        excute: function(){
            for(var i = 0, command; command = this.commandsList[i++];) {
                command.excute()
            }
        }
    }
}

var openAcCommand = {
    excute: function() {
        console.log('打开空调')
    }
}

var openTvCommand = {
    excute: function(){
        console.log("打开TV");
    }
}

var openSoundCommand = {
    excute: function(){
        console.log("打开音响");
    }
}
// 打开音响和电视的command是同时的
var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );

/**
 * 打开电脑和打登录QQ的命令
 */


var openPcCommand = {
    excute: function(){
        console.log("打开电脑")
    }
}

var openQQCommand = {
    excute: function(){
        console.log('打开QQ')
    }
}

var macroCommand2 = MacroCommand();
macroCommand2.add( openPcCommand);
macroCommand2.add(openQQCommand);




/**
 * 把所有命令组合成一个超级命令
 */

var macroCommand = MacroCommand();
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

/**
 * 最后给遥控器绑定超级命令
 */

var setCommand = (function(command) {
    document.getElementById('button').onClick = function(){
        command.excute()
    }
})(macroCommand);


/*
    如果叶对象没有add方法，但是去执行了add会报错，所以对于有些没有add方法的对象还是要添加add方法进行相应的提示。
*/

var openTvCommand = {
    excute: function() {
        console.log('打开电视')
    },
    add: function(){
        throw new Error('叶对象不能添加子节点')
    }
}

var macroCommand = MacroCommand();
macroCommand.add(openTvCommand);
openTvCommand.add(macroCommand);