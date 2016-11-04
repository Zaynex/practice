(function () {
	var Pie = (function(){
		var F = function(conf){
			this.type = conf.type || null;
			this.id = null;
			this.total = 0;
			this.container = null;
			this.data =[];
			this.init(conf);
			return this;
		};

		F.prototype = {
			defaultBgcolor: ['deeppink', 'mediumslateblue', 'chartreuse', 'goldenrod', "#ffff00", "#2F368F", "#F6A25D", "#2CA8E0", "#77D1F6", '#181818', '#45AB35', "#336699", "#5fD1F6"],
			init: function(options){
				for(var p in options){
					this[p] = options[p];
				}
				this.container = document.getElementById(this.id);
			},

			percentize: function(){
				if(this.type && this.type == '%') {
					var sum = 0;
					for(var i = 0; i < this.data.length; i++){
						sum += this.data[i][1];

						if(this.data[i + 1] && (sum + this.data[i + 1][1]) > 100)
							break;
					}
					if(i != this.data.length){
						this.data = this.data.splice(0, i+1);
					}
					if(sim != 100){
						this.data.push(['?', Math.ceil(100 - sum), '#282282']);
					}
				}else {
				var sum = 0;

				for(var i = 0; i < this.data.length; i++){
					sum += this.data[i][1];
				}
				if(0 === this.total){
					this.total = sum;
				}
				if(this.total - sum > 0){
					this.data.push(['?',this.total -sum, '#282282']);
				}

				for(var i = 0;i < this.data.length; i++){
					this.data[i][1] =Math.round(this.data[i][1] / this.total);
				}
			}
		},

		renderPie: function(){
			var x = this.container.clientWidth * .33;
			var y = this.container.clientHeight * .5;
			var radius = ( x > y ) ? y : x;
			var ctx = this.container.getContext('2d');
			var startPoint = 0;
			for(var i = 0; i < this.data.length; i++){
				if( null == this.data[i][2]) {
					this.data[i][2] = this.defaultBgcolor[ i % this.defaultBgcolor];
				}
				ctx.fillStyle = this.data[i][2];
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.arc(x, y, radius, startPoint, startPoint + Math.PI * 2  * (this.data[i][1] / 100), false)
				ctx.fill();
				startPoint += Math.PI * 2 * (this.data[i][1] / 100);
			}
			 return true;
		}

		var Pie = function(conf){
			retur new F(conf);
		}

		return Pie;
	})();

	window.pie = Pie;
})(window);