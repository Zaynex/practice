var setName = document.querySelector(".setName");
var textarea = document.querySelector(".textarea");
var btn = document.querySelector(".btn");
var imgChoice = document.querySelector(".imgchoice");
var leftWords= document.getElementsByClassName("leftwords")[0];
var oCountTxt = document.getElementsByClassName("words")[0];
var maxNum = 140;
function isSetName(){
	if(setName.value === ""){
		alert("请输入姓名");
		return false;
	}
	return true;
}

function isWord(){
	if(textarea.value === ""){
		alert("请输入内容");
		return false;
	}
	return true;
}

var imgChoiceAll = imgChoice.getElementsByTagName("img");
var length = imgChoiceAll.length;
EventUtil.addHandler(imgChoice, "click", function(event){
	var e = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(e);
	for(var i = 0; i < length; i++) {
		imgChoiceAll[i].className = "";
	}
	target.className = "current";

});


EventUtil.addHandler(textarea, "keyup", confine);
EventUtil.addHandler(textarea, "focus", confine);
EventUtil.addHandler(textarea, "change", confine);
function confine ()
	{
		var iLen = 0;		
		for (i = 0; i < textarea.value.length; i++) iLen += /[^\x00-\xff]/g.test(textarea.value.charAt(i)) ? 1 : 0.5;
		leftWords.innerHTML = Math.abs(maxNum - Math.floor(iLen));	
		maxNum - Math.floor(iLen) >= 0 ? (css(leftWords, "color", ""), oCountTxt.innerHTML = "\u8fd8\u80fd\u8f93\u5165", bSend = true) : (css(oMaxNum, "color", "#f60"), oCountTxt.innerHTML = "\u5df2\u8d85\u51fa", bSend = false)
	}
	//加载即调用
	confine();	

var addMessage = document.querySelector(".addMessage");
var ali = addMessage.getElementsByTagName("li");
function uploadMsg(){
	if(isSetName() && isWord()){
		var name = setName.value;
		var message = textarea.value;
		var date = new Date();
		//console.log(name + " " + message + " " + src + date);//数据测试成功
		var oLi = document.createElement("li");
		oLi.innerHTML = 
			'					<img src="' + document.getElementsByClassName("current")[0].src +'" alt="">'+
			'					<div class="content">'+
			'						<div class="userName">'+
			'							<a href="#">' + name + '</a>说：'+
			'							<div class="msgInfo">'+ message + '</div>'+
			'						</div>'+
			'						<div class="times">'+
			'							<span>' + date + '</span>'+
			'							<a href="#" class="del">删除</a>'+
			'						</div>'+
			'					</div>';

		ali.length >0 ? addMessage.insertBefore(oLi, ali[0]) : addMessage.appendChild(oLi);

		message = "";
		name = "";
		for (i = 0; i < length; i++) imgChoiceAll[i].className = "";
		imgChoiceAll[0].className = "current";

		//重置表单
		document.querySelector("form").reset();

		//运动
		css(oLi, {"opacity" : "0", "height" : "0"});
		startMove(oLi, {height: 50, opacity: 100});
		liHover();
		delLi();
	}
}
EventUtil.addHandler(document.querySelector("form"), "submit", function () {return false});

EventUtil.addHandler(btn, "click", uploadMsg);
EventUtil.addHandler(document,'keyup', function(event){
	var event = EventUtil.getEvent(event);
	event.ctrlKey && event.keyCode == 13 && uploadMsg();
});

function liHover(){
	for (i = 0; i < ali.length; i++)
	{
		//li鼠标划过样式
		EventUtil.addHandler(ali[i], "mouseover", function (event)
		{
			this.className = "active";
			oTmp = get.byClass("times", this)[0];//获得当前li节点下的times的class
			var aA = get.byTagName("a", oTmp);//获取a标签
			aA[0].style.display = "block";
		});

		//li鼠标离开样式
		EventUtil.addHandler(ali[i], "mouseout", function ()
		{
			this.className = "";
			var oA = get.byTagName("a", get.byClass("times", this)[0])[0];
			oA.style.display = "none";
		});
	}
}
liHover();


function delLi(){
	var aA = get.byClass("del", addMessage);
	for(var i = 0; i < aA.length; i++) {
		aA[i].onclick = function(event){
			var event = EventUtil.getEvent(event);
			EventUtil.preventDefault(event);
			var oParent = this.parentNode.parentNode.parentNode;
			var iHeight = oParent.offsetHeight;
			var alpha = 100;
			console.log(oParent.parentNode);
			timer = setInterval(function ()
				{
					css(oParent, "opacity", (alpha -= 10));
					if (alpha < 0)
					{
						clearInterval(timer);						
						timer = setInterval(function ()
						{
							iHeight -= 10;
							iHeight < 0 && (iHeight = 0);
							css(oParent, "height", iHeight + "px");
							iHeight == 0 && (clearInterval(timer), addMessage.removeChild(oParent))
						},30)
					}	
				},30);			
				this.onclick = null	
			// startMove(oParent,{Height:0, opacity: 0});
			// console.log(iHeight);
			// if(iHeight === 0) addMessage.removeChild(oParent);
			// console.log(oParent);
			// this.onclick = null;
		};
	}
}
delLi();