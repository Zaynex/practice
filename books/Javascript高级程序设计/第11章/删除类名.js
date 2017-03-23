var div=document.getElementsByTagName("div")[0];
		var classNames = div.className.split(/\s+/);

		var pos = -1;
			i,
			len;
		for(i=0, len=classNames.length; i<len; i++){
			if(classNames[i] == "user"){
				pos = i;
				break;
			}
		}

		classNames.splice(i,1); //删除类名

		div.className = classNames.join(" ");
		//添加类名拼成字符串重新设置

在HTML5中，可以借用class