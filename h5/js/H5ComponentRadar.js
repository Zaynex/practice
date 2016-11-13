var H5ComponentRadar = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  //绘制网格线，背景层
  var w = cfg.width;
  var h = cfg.height;

  var cns = document.createElement("canvas");
  var ctx = cns.getContext("2d");
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  var r = w /2;
  ctx.beginPath();
  ctx.arc(r, r, 5, 0, 2*Math.PI);
  ctx.stroke();

  // ctx.beginPath();
  // ctx.arc(r, r, r-5, 0 ,2*Math.PI);
  // ctx.stroke();

  var step = cfg.data.length;
  //雷达图
  var isBlue = false;
  for(var s = 10; s > 0; s--){
    ctx.beginPath();
    for(var i = 0; i < step; i++){
      var rad = (2*Math.PI / 360) * (360 / step) * i;
      var x = r + Math.sin(rad) * r * (s/10);
      var y = r + Math.cos(rad) * r * (s/10);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = (isBlue = !isBlue) ?'#99c0ff' : '#f1f9ff';//颜色注意不能大写
    ctx.fill();
  }

  //伞骨图
  for(var i = 0;i<step;i++){
    var  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;

    var x = r + Math.sin( rad ) * r ;
    var y = r + Math.cos( rad ) * r ;
    ctx.moveTo(r,r);
    ctx.lineTo(x,y);
    //  输出项目文字
    var text = $('<div class="text">');
    text.text( cfg.data[i][0] );

    if( x > w/2 ){
     text.css('left',x/2+5);
    }else{
     text.css('right',(w-x)/2+5);
    }

    if( y > h/2){
      text.css('top',y/2+5);
    }else{
      text.css('bottom',(h-y)/2+5);
    }
    if( cfg.data[i][2] ){
      text.css('color',cfg.data[i][2]);
    }
    text.css('opacity',0);
    text.css('transition','all .5s '+ i*.1 + 's');

    component.append(text);

  }
  ctx.strokeStyle = '#e0e0e0';
  ctx.stroke();


  var cns = document.createElement("canvas");
  var ctx = cns.getContext("2d");
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  var draw = function(per){
    if(per <= 1){
        component.find('.text').css('opacity',0);
    }
    if(per >= 1){
        component.find('.text').css('opacity',1);
    }
    //连线
    ctx.clearRect(0, 0, w ,h);
    for(var i = 0; i < step; i++){
      var rad = (2*Math.PI / 360) * (360 / step) * i;
      var rate = cfg.data[i][1] * per;
      var x = r + Math.sin(rad) * r * rate;
      var y = r + Math.cos(rad) * r * rate;
      
      ctx.lineTo(x, y);
    }
    // ctx.closePath();
    ctx.stroke();

    //输出数据的点
    ctx.fillStyle = "#ff7676";
    for(var i = 0; i < step; i++){
      var rad = (2*Math.PI / 360) * (360 / step) * i;
      var rate = cfg.data[i][1] * per;
      var x = r + Math.sin(rad) * r * rate;
      var y = r + Math.cos(rad) * r * rate;
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2*Math.PI);
      ctx.fill();//填充颜色
      ctx.closePath();//如果已经闭合，什么也不不做
    }

  };

   component.on('onLoad',function(){
    //  雷达图生长动画
      // var s = 0;
      for(i = 0; i <100; i++){
        (function(i){
          setTimeout(function(){
            // s += .01;
            // draw(s);
            draw(i/100 + 0.1);
            console.log(i);
          }, i*10 + 500);
        })(i)
      }
  });
   component.on('onLeave',function(){
    //  雷达图退场动画
      for(i = 0; i < 100; i++){
        (function(i){
          setTimeout(function(){
            draw(1-i/100);
          }, i*10);
        })(i)
      }
  });

  return component;
}