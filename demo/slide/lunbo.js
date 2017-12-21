function AutoPlay(id){
	this.init(id);
}

AutoPlay.prototype = {
	init: function(id){
		var self = this;
		this.oBox = $(id);
		this.oUl = $$('ul', this.Box)[0];
		this.aImg = $$("img",this.Box);
		this.timer = null;
		this.autoTimer = null;
		this.aNow = 0;
		this.createBtn();
		this.aBtn = $$('li', this.oCount);
		this.toggle();
		self.slideTime = this.slideTime = 3000;//配置滚动时间
		this.autoTimer = setInterval(function(){
			self.next();
		}, this.slideTime);
		this.oBox.onmouseover = function(){
			clearInterval(self.autoTimer);
		};
		this.oBox.onmouseout = function(){
			self.autoTimer = setInterval(function(){
				self.next();
			}, self.slideTime);
		};

		for(var i = 0; i < this.aBtn.length; i++){
			this.aBtn[i].index = i;
			this.aBtn[i].onmouseover = function(){
				self.aNow = this.index;
				self.toggle();
			}
		}
	},


	createBtn: function(){
		this.oCount = document.createElement('ul');
		this.oFrag = document.createDocumentFragment();
		this.oCount.className = "count";

		for(var i = 0; i < this.aImg.length; i++){
			var oLi = document.createElement("li");
			oLi.innerHTML = i + 1;
			this.oFrag.appendChild(oLi);
		}
		this.oCount.appendChild(this.oFrag);
		this.oBox.appendChild(this.oCount);
	},

	toggle: function(){
		for(var i = 0; i <this.aBtn.length; i++) {
			this.aBtn[i].className = "";
		}
		this.aBtn[this.aNow].className = "current";
		this.doMove(-(this.aNow * this.aImg[0].offsetHeight));//这里表示移动多少高度，目前是上下移动
	},
	next : function(){
		this.aNow++;
		this.aNow === this.aBtn.length && (this.aNow = 0); //如果前一个为true，返回第二个的结果，表示aNow转化到0
		this.toggle();
	},

	doMove: function(iTarget){
		var self = this;
		clearInterval(self.timer);
		self.timer = setInterval(function(){
			var iSpeed = (iTarget - self.oUl.offsetTop) / 5;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			self.oUl.offsetTop == iTarget ? clearInterval(self.timer) : (self.oUl.style.top = self.oUl.offsetTop + iSpeed + "px");
		}, 30);
	}
}

window.onload = function(){
	new AutoPlay("#box");
}