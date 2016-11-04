/* 柱图组件对象 */

var H5ComponentPolyline = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  var w = cfg.width;
  var h = cfg.height;

  var cns = document.createElement('canvas');
  var ctx = cns.getContext("2d");
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  component.append(cns);

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#AAAAAA";
  var step = 10;//这里要加1是因为数值是在坐标点上的

  window.ctx = ctx;
  for(var i = 0; i < step + 1; i++){
    var y = (h/step) * i;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  // ctx.stroke();
  //垂直网格线
  step = cfg.data.length + 1;
  var text_w = w/step >> 0;
  for(var i = 0; i < step + 1; i++){
    var x = (w/step) * i;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    if(cfg.data[i]){
      var text = $('<div class="text"></div>');
      text.text(cfg.data[i][0]);
      text.css('width', text_w/2)
        .css('left', x/2 + text_w/4);

      component.append(text);
    }
  }



  ctx.stroke();
  






  /**
   * 折线图数据层
   *@param  {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
   * @return {DOM}     Component元素
   */
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    component.append(cns);

  //加入画布折线图数据
 
  function draw(per){
    
   ctx.clearRect(0,0,w,h);



    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ff8878";

    var x = 0;
    var y = 0;

    var row_w = (w / (cfg.data.length + 1));
    for(i in cfg.data){
      var item = cfg.data[i];
      // x = (w / cfg.data.length) * i;
      x = row_w * i + row_w;
      y = h - (item[1] * h * per);
      ctx.moveTo(x, y);
      ctx.arc(x, y, 5, 0, 2*Math.PI);
    }
    

    //  移动画笔到第一个数据的点位置
    ctx.moveTo(row_w, h-(cfg.data[0][1]* h * per ));
    for(i in cfg.data){
      var item = cfg.data[i];
      x = row_w * i + row_w;
      y = h -(item[1]* h * per);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    //这里是为了把边线都给去掉了
    ctx.strokeStyle = "rgba(255, 255, 255, 0)";
   
    //阴影
    ctx.lineTo(x, h);
    ctx.lineTo(row_w, h);
    //填充背景颜色
    ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
    //收笔
    ctx.fill();


    //写数据
    for(var i in cfg.data){
      var item = cfg.data[i];
      x = row_w * i + row_w;
      y = h -(item[1] * h * per);
      //这里判断应该是有问题的，如果不存在颜色参数就会判断到后面的参数，所以在传入的时候需要把颜色参数为空,我用null表示
      ctx.font = "bold 1.9em Arial";
      ctx.fillStyle = item[2]? item[2] : "#595959";//其实这里判断不合理的
      ctx.fillText( ( (item[1]*100)>>0) + "%", x-10, y-20);
    }
    ctx.stroke();

  };

    component.on('onLoad', function(){
      //折线图生长动画
      var s = 0;
      for(i = 0; i <100; i++){
        setTimeout(function(){
          s += .01;
          draw(s);
        }, i*10 + 500);
      }
    });

    component.on('onLeave', function(){
      var s = 1;
      for(i = 0; i < 100; i++){
        setTimeout(function(){
          s -= .01;
          draw(s);
        }, i*10);
      }
    });

    return component;
  }