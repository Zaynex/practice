## 内容管理组件
H5对象提供最基本的创建页面和组件的方法。
根据不同的type类型，创建不同的组件。
```js
var H5 =function ( ) {
  this.addPage = function(name, text){
    ///.....
    return rhis;
  }
  this.addComponent = function(name, cfg){
    jdata.push({isPage:false,name:name, cfg:cfg});
    var cfg = cfg || {};
    cfg = $.extend({
         type : 'base'
     },cfg);

    var component;  //  定义一个变量，存储 组件元素
    var page = this.page.slice(-1)[0];
    switch( cfg.type ){
        case 'base' :
            component = new H5ComponentBase(name,cfg);
            break;

        case 'polyline' :
            component = new H5ComponentPolyline(name,cfg);
            break;

        case 'pie' :
            component = new H5ComponentPie(name,cfg);
            break;
        case 'bar' :
            component = new H5ComponentBar(name,cfg);
            break;
        case 'bar_v' :
            component = new H5ComponentBar_v(name,cfg);
            break;

        case 'radar' :
            component = new H5ComponentRadar(name,cfg);
            break;

        case 'pie' :
            component = new H5ComponentPie(name,cfg);
            break;
        case 'ring' :
            component = new H5ComponentRing(name,cfg);
            break;
       case 'point' :
            component = new H5ComponentPoint(name,cfg);
            break;
        default:
    }

    page.append(component);
    return this;
  }

  this.loader = function(){
    //...
    return this;
  }
  return this;//链式调用
};
```
### 主要功能
1. 新建独立页面
2. 新增图文组件
3. 整合fullpage.js页面载入以及跳转

#### jQuery.extend()用法
```js
var cfg = cfg || {};
    cfg = $.extend({
         type : 'base'
     },cfg);
```
jQuery.extend()
1. 为jQuery类添加类方法，可以理解为添加静态方法。
2. 用一个或多个其他对象来扩展一个对象，返回被扩展的对象

jQuery.fn.extend(object)
1. 对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。

## 图文组件
H5ComponentBase.js
这是一个最基础的组件，把共性都放在该组件上，特性则根据`type`类型进行相应的组件创建。

- width/height
- animateIn/animateOut
- css(postion,opacity等)
这些基础样式都在这里定义。
最后返回的是一个对象。
```
var H5ComponentBase = function(name, cfg){
    var cfg = cfg || {};
    var type = cfg.type || "base";
    var text = cfg.text || "";
    var component = $('<div class="h5_component '+ cls +' h5_component_name_'+ name +'" id="'+ id +'"></div>');//可以直接写在里面，也可以通过$().text实现
    component.text(text);
    //这里让width和height减少一半是希望在高清屏下显示更加细腻
    cfg.width  && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css    && component.css(cfg.css);
    cfg.bg     && component.css('backgroundImage', 'url(' + cfg.bg + ')');
    cfg.center && component.css({
        marginLeft: (cfg.width/4 * -1) + "px",
        left: '50%',
    });
    return component;
```

## 图形设计
### 整体结构
通过`new H5ComponentBase`拿到对象之后，再增加自己的特殊组件。
```js
var H5ComponentPolyline = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);
  //...
  return component;
}
```

### 柱状图对象创建过程
```js
var H5ComponentBar = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  $.each(cfg.data, function(idx, item){
    var line = $('<div class="line"></div>');
    var name = $('<div class="name"></div>');
    var rate = $('<div class="rate"></div>');
    var per = $('<div class="per"></div>');
    
    var width = item[1]*100 + "%";
    var bg = $('<div class="bg"></div>');
    rate.append(bg);
    //如果存在颜色
    if(typeof item[2] == 'string'){
      bg.css('background-color',item[2]);
    }

    rate.css('width', width);
    name.text(item[0]);
    per.text(width);
    line.append(name).append(rate).append(per);
    component.append(line);

  });

  return component;
}
```
### 柱状图数据传入
```js
 var cfg = {
        type: "bar",
        width: 530,
        height: 600,
        data: [
            ['JavaScript', 0.5, 'green'],
            ['CSS3', 0.2, 'yellow', 0,'-60%'],
            ['HTML5', 0.2, 'red', 0, '120%'],
            ['Bootstrap', 0.3, 'red', 0, '120%'],
            ['Bootstrap', 0.3, 'red', 0, '120%'],
            ['HTML5', 0.2, 'red', 0, '120%'],
            ['CSS3', 0.2, 'yellow', 0,'-60%'],
            
        ],
        css: {
          top: 100,
            opacity: 0
        },
        animateIn:{
            top: 100,
          opacity: 1
        },
        animateOut:{
            top: 200,
          opacity: 0
        },
        center: true,
   };
    var h5 = new H5ComponentBar('myName', cfg);
    $(".iphone").append(h5);
```

### 水平柱状图实现
```html
</style>
<div class="line">
    <div class="name">JavaScript</div>
    <div class="rate"><div class="bg"></div></div>
    <div class="per">50%</div>
</div>
```
这里要注意的是给`rate`一个固定的宽度，让里面的`bg`去改变宽度，这样就不会影响`per`的显示了。
这个组件载入动画流程
1. 通过H5ComponentBase对象载入组件以及组件进入的动画（一个是载入动画，如载入柱状图时从上到下）
2. 通过各个组件单独的样式设置呈现组件的动画（载入后自身的动画，如柱状图的宽度水平增长以及百分比的延迟显示）

### 垂直柱状图实现
每个`Line`设定为 `float:left`。每个元素的宽度可以设定为一个固定`width/4`，大小由自己调节。再通过`position:relative`以及`absolute`对每个元素进行定位调节。比如坐标轴采用`bottom:-20px`。

### 折线图
#### 网格底图
```js
ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#AAAAAA";
  //水平网格线
  var step = 10;//这里要加1是因为数值是在坐标点上的
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
      //网格坐标轴数据
      var text = $('<div class="text"></div>');
      text.text(cfg.data[i][0]);
      text.css('width', text_w/2)
        .css('left', x/2 + text_w/4);
      component.append(text);
    } 
  }
  ctx.stroke();
```
#### 折线图点
画完之后发现其实整体的坐标还需要往右移一个单位。
```js
var row_w = (w / (cfg.data.length + 1));
    for(i in cfg.data){
      var item = cfg.data[i];
      // x = (w / cfg.data.length) * i;
      x = row_w * i + row_w;
      y = h - (item[1] * h);
      ctx.moveTo(x, y);
      ctx.arc(x, y, 5, 0, 2*Math.PI);
    }
```
从代码中我们可以看出，首先是分成了（数据长度+1）宽度，
这样每个起始点再加一个单位宽度偏移就刚好位置都对齐了。

#### 折线图连线
连线需要定位到第一个数据
```
ctx.moveTo(row_w, h-(cfg.data[0][1]*h);
```
再利用for循环将每个数据连线
```
 for(i in cfg.data){
    var item = cfg.data[i];
    x = row_w * i + row_w;
    y = h -(item[1]* h);
    ctx.lineTo(x, y);
    //其实(x,y)就是原先的定位的数据
  }
```

#### 绘制阴影
```
//将末尾的点连到水平坐标轴
 ctx.lineTo(x, h);
 //将起始点连到水平坐标轴
    ctx.lineTo(row_w, h);
    //填充背景颜色
    ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
    //收笔
    ctx.fill();
```

#### 折线图具体数据
```js
for(var i in cfg.data){
      var item = cfg.data[i];
      x = row_w * i + row_w;
      y = h -(item[1] * h * per);
      ctx.font = "bold 1.9em Arial";
      ctx.fillStyle = typeof item[2] === 'string' ? item[2] : "#595959";
      ctx.fillText( ( (item[1]*100)>>0) + "%", x-10, y-20);
    }
```

### 雷达图
计算一个圆周上的坐标（计算多边形的顶点坐标）
已知：圆心坐标(a,b)、半径 r；角度deg。
```rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i
x = a + Math.sin( rad ) * r;
y = b + Math.cos( rad ) * r;
```

```js
var cns = document.createElement("canvas");
  var ctx = cns.getContext("2d");
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  var r = w /2;
  ctx.beginPath();
  ctx.arc(r, r, 5, 0, 2*Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(r, r, r-5, 0 ,2*Math.PI);
  ctx.stroke();

  var step = cfg.data.length;
  //伞骨图
  ctx.beginPath();
  for(var s = 0; s < step; s++){
    var rad = (2*Math.PI / 360) * (360 / step) * s;
    var x = r + Math.sin(rad) * r;
    var y = r + Math.cos(rad) * r;

    // ctx.moveTo(r, r);
    ctx.lineTo(x, y);
    // ctx.arc(x, y, 5, 0, 2*Math.PI);
  }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //内雷达图
    ctx.beginPath();
   for(var s = 0; s < step; s++){
    var rad = (2*Math.PI / 360) * (360 / step) * s;
    var x = r + Math.sin(rad) * r * 0.5;
    var y = r + Math.cos(rad) * r * 0.5;

    // ctx.moveTo(r, r);
    ctx.lineTo(x, y);
    // ctx.arc(x, y, 5, 0, 2*Math.PI);
  }
    ctx.fillStyle = '#f00';
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
```

```js
for(var i = 0; i < step; i++){
    var  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;

    var x = r + Math.sin( rad ) * r ;
    var y = r + Math.cos( rad ) * r ;
    ctx.moveTo(r,r);
    ctx.lineTo(x,y);
  }
  ctx.strokeStyle = "#e0e0e0";
  ctx.stroke();
```

### 饼图
底图层
数据层(颜色)
遮罩层，让遮罩层去动画
画圆，起始角度和结束角度。
```js
ctx.moveTo(r,r);
ctx.arc(r,r,r, sAngel, aAngel);
```
动画过程利用遮罩层的逆向画圆实现的。默认为flase顺时针画圆。

### 环图
环图其实就是在饼图最上方再添加一个图层，遮住中间的数据颜色显示

## 技巧
css3 animation 的运用
生成唯一的id
水平居中：设置是否为true来确保是否可以居中


Point
在做散点图的时候主要有些参数时可选或者是0的，所以在判断时尽量用undefined而不是直接将该数放进if里。(0在if语句中会转移为布尔值false)
position:absolute;
top: -50%;
这个百分比是相对于谁的？ 
以相对定位参照元素的高度为100%来计算，相当于移动了那个相对定位参照元素的高度的一半。

css水影效果
其实是叠加的，上面一个不变，底层进行一个放大。


//保留整数位运算符
var width = (100/cfg.data.length) >> 0;


折线图
因为我们要求数据是在坐标轴的中心点上。所以要画的线的条数是 数据长度+2
。


```js
ctx.fillText(num, x, y);//num数值， （x,y）坐标
```

