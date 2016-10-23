/* 柱图组件对象 */

var H5ComponentPolyline = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    var cns = document.createElement("canvas");
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#F00";
    window.ctx = ctx;
    for (var i = 0; i < step + 1; i++) {
        var y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }

    //垂直分割线，根据项目个数来分
    step = cfg.data.length + 1;
    var text_w = w/step;
    for (var i = 0; i < step + 1; i++) {
        var x = w / step * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);

        if(cfg.data[i]){
        	var text = $('<div class="text"></div>');
        	text.text(cfg.data[i][0]);
        	text.css('width', text_w/2).css('left',x/2 + text_w/4);

        	component.append(text);
        }
    }

    ctx.stroke();




    //加入画布，数据层，绘制折线数据
    var cns = document.createElement("canvas");
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    

    
	
    /**
     * 绘制折线以及对应的数据和阴影
     * @param  {float} per 0到1之间的数据，会根据这个值绘制相应的数据状态
     * @return {[type]}     [description]
     */
	var draw = function( per ){
		ctx.clearRect(0, 0, w, h);
		ctx.beginPath();
	    ctx.lineWidth = 3;
	    ctx.strokeStyle = "#888";
	    var x = 0,
	    	y = 0;
	    // ctx.moveTo(10, 10);
	    // ctx.arc(10, 10, 5, 0,2*Math.PI);
	    var row_w = (w / (cfg.data.length + 1));
	    //画点
	    for(i in cfg.data){
	    	var item =cfg.data[i];
	    	x = row_w * i + row_w;
	    	y = h- (item[1] * h * per);
	    	ctx.moveTo(x, y);
	    	ctx.arc(x, y, 5, 0, 2*Math.PI);
	    }

	    //连线
	    //移动画笔到第一个点
	    
	    ctx.moveTo(row_w, h- (cfg.data[0][1] * h * per));
	    // ctx.arc(row_w, h * (1-cfg.data[0][1]), 50, 0, 2*Math.PI);
	    for( i in cfg.data){
	    	var item = cfg.data[i];
	    	x = row_w * i + row_w;
	    	y = h- (item[1] * h * per);
	    	ctx.lineTo(x, y);
	    }
	    ctx.stroke();

	    ctx.lineWidth = 1;
	    ctx.strokeStyle = ('rgba(146, 213,47,0.7)');

	    //绘制阴影
	    ctx.lineTo(x, h);
	    ctx.lineTo(row_w, h);
	    ctx.fillStyle = ('rgba(146, 213,47,0.7)');
	    ctx.fill();


	    
	    //写数据
	    for( i in cfg.data){
	    	var item = cfg.data[i];
	    	x = row_w * i + row_w;
	    	y = h- (item[1] * h * per);
	    	if(item[2]){
	    		ctx.fillStyle = item[2] ? item[2] : "#333";
	    	}
	    	ctx.fillText((item[1]*100>>0) + "%", x-10, y-10);
	    }
    };
    // draw(1);
    
    

    //折线图生长动画
    component.on('onLoad', function(){
    	var s = 0;
    	for(i = 0; i < 100; i++){
    		setTimeout(function(){
    			s += 0.01;
    			draw(s);
    		}, i*10 + 500);
    	}
    });
     component.on('onLeave', function(){
    	var s = 1;
    	for(i = 0; i < 100; i++){
    		setTimeout(function(){
    			s -= 0.01;
    			draw(s);
    		}, i*10);
    	}
    });


    ctx.stroke();

    return component;
};
