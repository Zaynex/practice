function Slide(){}

Slide.prototype = {
		bigbox:null,//最外层容器
		boxul:null,//子容器ul
		imglist:null,//子容器img
		numlist:null,//子容器countNum
		index:0,//当前显示项
		timer:null,//控制图片转变效果
		play:null,//控制自动播放
		imgurl:[],//存放图片
		count:0,//存放的个数
		autoTime: 3000, //设定一张图片滚动时间
	//初始化操作
	//包括在#box下创建两个ul,一个用于存放图片，一个用于存放圈圈
	
	init: function(id){
		this.count = this.count <= 5? this.count:5;
		this.bigbox = $(id);
		for(var i = 0; i < 2; i++) {
			var ul = document.createElement("ul");		
			for(var j = 1; j <= this.count; j++) {
				var li =document.createElement("li");
				// console.log(li);
				li.innerHTML = (i === 0) ? this.imgurl[j-1] : j;//这句话一下子就把图片和圆点也给加上了
				// if(i === 0) {
				// 	li.innerHTML = this.imgurl[j-1];
				// } //如果不需要给圆点加数字的话
				ul.appendChild(li);
			}
			this.bigbox.appendChild(ul);
		}
		//添加样式名
		this.boxul = this.bigbox.getElementsByTagName('ul');
		this.boxul[0].className = "imgList";
		this.boxul[1].className = "countNum";
		this.imglist = this.boxul[0].getElementsByTagName("li");
		this.numlist = this.boxul[1].getElementsByTagName("li");
		this.numlist[0].className = "current";
	},


	//封装程序入口
	action: function(id){
		this.autoPlay();
		// console.log("moving");
		// 移入移出时的事件注册程序
		this.mouseoverout(this.bigbox, this.numlist);
	},

	imgShow: function(num, numlist, imglist){
		this.index = num;
		var alpha = 0;
		for(var i = 0; i < numlist.length; i++) {
			numlist[i].className = "";
		}
		numlist[this.index].className = "current";
		clearInterval(this.timer);
		for(var j = 0; j < imglist.length; j++) {
			imglist[j].style.opacity = 0;
			imglist[j].style.filter = "alpha(opacity=0)";
		}

		var $this = this;
		this.timer = setInterval(function(){
			alpha += 2;
			if(alpha > 100) {alpha = 100};
			//兼容性
			imglist[$this.index].style.opacity = alpha/100;
			imglist[$this.index].style.filter = "alpha(opacity=" + alpha + ")";
			if(alpha==100) {
				clearInterval($this.timer);
			}
		}, 20);
	},
	autoPlay: function(){
		var $this = this;
		this.play = setInterval(function(){
			$this.index++;
			if($this.index > $this.imglist.length -1) {
				$this.index = 0;
			}
			$this.imgShow($this.index, $this.numlist, $this.imglist);
		}, $this.autoTime);
	},

	mouseoverout: function(box, numlist){
		var $this = this;
		addEvent(box, "mouseover",function(){
			clearInterval($this.play);
		});
		addEvent(box, "mouseout", function(){
			$this.autoPlay($this.index);
		});

		for(var i = 0; i < numlist.length; i++){
			numlist[i].index = i;
			addEvent(numlist[i], "mouseover", function(){
				$this.imgShow(this.index, $this.numlist, $this.imglist);
			});
		}
	}
};
	window.onload = function(){
		var slide = new Slide();
		slide.count = 5;
		slide.imgurl = [
		"<img src=\"img/01.jpg\"/>",
		"<img src=\"img/02.jpg\"/>",
		"<img src=\"img/03.jpg\"/>",
		"<img src=\"img/01.jpg\"/>",
		"<img src=\"img/02.jpg\"/>"];
		slide.init("#box");
		slide.action("#box");
	}
