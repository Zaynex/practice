/*饼图*/
var H5ComponentPie = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  var w = cfg.width;
  var h = cfg.height;

  //加入一个画布
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = cns.height = h;
  $(cns).css('zIndex', 1);
  component.append(cns);


  var r = w /2;

  //  加入一个底图层
  ctx.beginPath();
  ctx.fillStyle='#eee';
  ctx.strokeStyle='#eee';
  ctx.lineWidth = 1;
  ctx.arc(r,r,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();

  //绘制数据层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;

  $(cns).css('zIndex',2);
  component.append(cns);
  
  var colors = ['red','green','blue','#a00','orange']; //  备用颜色
  var sAngel = 1.5 * Math.PI; //  设置开始的角度在 12 点位置
  var eAngel = 0; //  结束角度
  var aAngel = Math.PI*2; //  100%的圆结束的角度 2pi = 360

  //数据层
  var step = cfg.data.length;
  for(var i = 0;i < step; i++){
    var item = cfg.data[i];
    var color = item[2] || (item[2] = colors.pop());
    
    //计算每个数据占据的角度
    eAngel = sAngel + aAngel * item[1];


    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = .1;


    ctx.moveTo(r, r);
    ctx.arc(r,r,r, sAngel, eAngel);
    ctx.fill();
    ctx.stroke();

    //重新修改起始角度，让当前的结束角度是下一个数据的起始角度
    sAngel = eAngel;

    //加入所有项目的文本以及百分比
    var text= $('<div class="text"></div>');
    text.text(cfg.data[i][0]);
    var per = $('<div class="per"></div>')
    per.text(cfg.data[i][1]*100 + "%");
    text.append(per);
    var x = r + Math.sin(0.3*Math.PI-sAngel) * r;
    var y = r + Math.cos(0.3*Math.PI-sAngel) * r;
 
    if(x > w/2){
      text.css('left', x/2);
    }else{
      text.css('right', (w-x)/2+10);
    }
    if(y > h/2){
      text.css('top', y/2);
    }else{
      text.css('bottom', (h-y)/2);      
    }
    if( cfg.data[i][2] ){
      text.css('color',cfg.data[i][2]); 
    }
    text.css('opacity',0);
    component.append(text);
  }

  //蒙版层用于实现动画的数据显示
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  $(cns).css('zIndex',3);
  component.append(cns);


  // ctx.beginPath();
  ctx.fillStyle='#eee';
  ctx.strokeStyle='#eee';
  ctx.lineWidth = 1;

  var draw = function(per){
    ctx.clearRect(0,0, w, h);
    ctx.beginPath();
    ctx.moveTo(r, r);


    if(per <= 0){
      //如果小于0,不显示
      ctx.arc(r, r, r, 0, 2*Math.PI);
      component.find('.text').css('opacity',0);
    }else{
     ctx.arc(r, r, r, sAngel, sAngel+2*Math.PI*per, true);  
    }
    ctx.fill();
    ctx.stroke();

    if(per >= 1){
      component.find('.text').css('transition','all 0s');
      H5ComponentPie.reSort( component.find('.text') );
      component.find('.text').css('transition','all 1s');
      component.find('.text').css('opacity',1);
      ctx.clearRect(0,0,w,h);
  }
}
  draw(0);
  component.on('onLoad',function(){
    //  饼图生长动画
      for(i = 0; i <=100; i++){
        (function(i){
          setTimeout(function(){
            draw(i/100);
            console.log(i);
          }, i*10 + 500);
        })(i)
      }
  });
  component.on('onLeave',function(){
    //  饼图退场动画
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



//  重排项目文本元素
H5ComponentPie.reSort = function( list ){

  //  1. 检测相交
  var compare = function(domA, domB){
    var offsetA = $(domA).offset();
    var offsetB = $(domB).offset();

    var shadowA_x = [offsetA.left, $(domA).width() + offsetA.left];
    var shadowA_y = [offsetA.top, $(domA).height() + offsetA.top];

    var shadowB_x = [offsetB.left, $(domB).width() + offsetB.left];
    var shadowB_y = [offsetB.left, $(domB).height() + offsetB.top];

     //  检测 x
    var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

    //  检测 y 轴投影是否相交
    var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
    return intersect_x && intersect_y;
  }


  //  2. 错开重排
  var reset = function( domA, domB ){

    //这里只是让垂直方向不相交
    if( $(domA).css('top') != 'auto' ){

      $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height() );
    }
    if( $(domA).css('bottom') != 'auto' ){

      $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height() );
    }

  };

  //  定义将要重排的元素
  var willReset = [list[0]];

  $.each(list,function(i,domTarget){
    if( compare(willReset[willReset.length-1] , domTarget ) ){
      willReset.push(domTarget);  //  不会把自身加入到对比
    }
  });

  if(willReset.length > 1 ){
      $.each(willReset,function(i,domA){
          if( willReset[i+1] ){
            reset(domA,willReset[i+1]);
          }
      });
      H5ComponentPie.reSort( willReset );
  }
}